export class ListGamesDto {
  /**
   * Represents the title of the game.
   *
   * @remarks
   * This property is optional and can be used to filter games by their title.
   *
   * @property {string} [title] - The title of the game.
   * @example
   * 'The Legend of Zelda'
   */
  /**
   * @ApiProperty
   * Indicates that this property is optional.
   * Description: The title of the game.
   * Example: 'The Legend of Zelda'
   */
  title?: string;

  /**
   * @ApiProperty
   * Indicates that this property is optional.
   * Description: The platform of the game.
   * Example: 'Nintendo Switch'
   */
  platform?: string;

  /**
   * @ApiProperty
   * Indicates that this property is optional.
   * Description: The page number for pagination.
   * Example: 1
   */
  page?: number;

  /**
   * @ApiProperty
   * Indicates that this property is optional.
   * Description: The number of items per page for pagination.
   * Example: 10
   */
  limit?: number;
}
