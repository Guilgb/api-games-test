import { ApiProperty } from '@nestjs/swagger';

export class SearchGameDto {
  /**
   * Represents the title of the game to be searched.
   *
   * @property {string} title - The title of the game.
   * @example "Halo"
   */
  @ApiProperty({
    description: 'Título do jogo a ser pesquisado',
    example: 'Halo',
  })
  title: string;
}
