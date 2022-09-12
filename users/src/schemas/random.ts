/**
 * @swagger
 * components:
 *  schemas:
 *    random:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: the auto-generated id of entity
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
 *        user:
 *          type: string
 *          description: ID of the user to which the entity is linked
 *        address:
 *          type: string
 *          description: Address ID registered by that user
 *      required:
 *        - name
 *        - description
 *      example:
 *        id: gQBOyGbxcQy6tEp0aZ78X
 *        name: My first Task
 *        description: I have to do Something
 *    TaskNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found task
 *      example:
 *        msg: Task was not found
 *
 *  parameters:
 *    taskId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the task id
 */
