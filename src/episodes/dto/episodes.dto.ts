import {IsString, IsOptional, IsUrl, IsDateString} from "class-validator";
import {Types} from "mongoose";

/**
 * Request object format used in POSTing a new episode
 */
export class CreateEpisodeDto {
    @IsString()
    readonly name: string;
    @IsUrl()
    readonly image: string;
    @IsString()
    readonly description: string;
    @IsUrl()
    readonly fileUrl: string;
    @IsDateString()
    readonly releaseDate: Date;
}

/**
 * Request object format used in PUTing a new episode
 */
export class UpdateEpisodeDto {
    @IsString()
    @IsOptional()
    readonly name: string;
    @IsUrl()
    @IsOptional()
    readonly image: string;
    @IsString()
    @IsOptional()
    readonly description: string;
    @IsUrl()
    @IsOptional()
    readonly fileUrl: string;
    @IsDateString()
    @IsOptional()
    readonly releaseDate: Date;
    @IsOptional()
    readonly games: Types.ObjectId[];
}

/**
 * Response object format sent by the API
 */
export class EpisodeResponseObject {
    readonly _id: string;
    readonly _createdAt: Date;
    readonly _updatedAt: Date;
    readonly name: string;
    readonly image: string;
    readonly description: string;
    readonly fileUrl: string;
    readonly releaseDate: Date;
    readonly games: Types.ObjectId[];
    readonly verified: boolean;
}