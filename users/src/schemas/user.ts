/**
 * @swagger
 * components:
 *  schemas:
 *    RecoveryPass:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: E-mail registered in the account
 *          format: email
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: User id
 *          readOnly: true
 *        email:
 *          type: string
 *          description: user email
 *          format: email
 *        status:
 *          type: boolean
 *          description: user account status
 *        rol:
 *          type: string
 *          description: Role reference ID
 *        createdAt:
 *          type: Date
 *        updatedAt:
 *          type: Date
 *      example:
 *        status: true
 *        email: user@correo.ec
 *        createdAt: 2022-07-19T16:13:58.028Z
 *        updatedAt: 2022-07-19T16:13:58.028Z
 *        rol:
 *          name: Administrador
 *          id: 62d6d84621de20926f539639
 *    Entity:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: the auto-generated id of entity
 *          readOnly: true
 *        firstname:
 *          type: string
 *          description: name of registrant or company name
 *        lastname:
 *          type: string
 *          description: lastname of registrant
 *        dni:
 *          type: string
 *          description: dni or RUC
 *        principal:
 *          type: boolean
 *          description: True or False statement to know if the entity in the principal of the account.
 *          default: False
 *        email:
 *          type: string
 *          description: user email.
 *          format: email
 *        password:
 *          type: string
 *          description: user password
 *          format: password
 *        rol:
 *          type: string
 *          description: role reference
 *          enum:
 *            - Administrador
 *            - Mesero
 *            - Cocinero
 *            - Cliente
 *      required:
 *        - firstname
 *        - dni
 *        - email
 *        - password
 *        - rol
 *      example:
 *        id: gQBOyGbxcQy6tEp0aZ78X
 *        firstname: Alice
 *        lastname: Doe
 *        dni: 9999999999
 *        email: user@correo.ec
 *        password: Password
 *        rol: gQBOyGbxcQy6tEp0aZ345
 *    ExistField:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: A message indicating the existing field
 *        field:
 *          type: string
 *          description: Existing field name
 *      example:
 *        message: Dirección de correo registrada
 *    NotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: A message for the not found user
 *      example:
 *        message: No se ha encontrado el recurso
 *
 *  parameters:
 *    id:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the user id
 */

/**
 * @swagger
 * users:
 *  name: Users
 *  description: Users endpoint
 */
