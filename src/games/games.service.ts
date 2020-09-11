import {HttpException, Injectable, NotFoundException} from "@nestjs/common";

import {CreateGameDto, GetGameDto, UpdateGameDto} from "./games.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import {Game} from "./games.model";
import {isObjectId} from "../utils";

@Injectable()
export class GamesService {
    constructor(
        @InjectModel('Game') private readonly gameModel: Model<Game>
    ) {
    }

    async insertGame(createGameDto: CreateGameDto): Promise<GetGameDto> {
        const newGame = new this.gameModel(createGameDto);
        const result = await newGame.save();
        return this.mapResponseToData(result);
    }

    async updateGame(id: string, updateGameDto: UpdateGameDto): Promise<GetGameDto> {
        const game = await this.findAndUpdateGame(id, updateGameDto);
        const result = await game.save();
        return this.mapResponseToData(result);
    }

    async findAllGames(): Promise<GetGameDto[]> {
        const gameResults: Game[] = await this.gameModel.find().exec();
        return gameResults.map(game => this.mapResponseToData(game))
    }

    async findOneGame(id: string): Promise<GetGameDto> {
        const game = await this.findGame(id);
        return this.mapResponseToData(game);
    }

    async deleteGame(id: string): Promise<any> {
        if (!isObjectId(id)) {
            throw new NotFoundException('Could not find game.');
        }
        const result = await this.gameModel.deleteOne({_id: id}).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find game.');
        }
    }

    private async findGame(id: string): Promise<Game> {
        let game;
        try {
            game = await this.gameModel.findById(id).exec();
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
        if (!game) {
            throw new NotFoundException('Could not find game.');
        }
        return game;
    }

    private async findAndUpdateGame(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
        const game = await this.gameModel.findOneAndUpdate({_id: id}, updateGameDto, {new: true});

        if (!game) {
            throw new NotFoundException('Could not find game.');
        }
        return game;
    }

    private mapResponseToData(gameResult: Game): GetGameDto {
        const {_id, name, _createdAt, _updatedAt, cover, screenshot, releaseDate} = gameResult;
        return {
            _id,
            _createdAt,
            _updatedAt,
            name,
            cover,
            screenshot,
            releaseDate
        }
    }
}