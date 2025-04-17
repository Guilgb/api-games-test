export class CreateUserDto {
  /**  - The unique identifier of the user (optional).
   * @property {string} email - The email address of the user.
   * @swagger {ApiProperty} Indicates that this property is required.
   * @example 'user@example.com'
   */
  email: string;

  /**
   * @property {string} password - The password of the user.
   * @swagger {ApiProperty} Indicates that this property is required.
   * @example 'securePassword123'
   */
  password: string;

  /**
   * @property {string} name - The name of the user.
   * @swagger {ApiProperty} Indicates that this property is required.
   * @example 'John Doe'
   */
  name: string;
}
