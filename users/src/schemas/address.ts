/**
 * @swagger
 * components:
 *  schemas:
 *    Address:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: Address id
 *          readOnly: true
 *        email:
 *          type: string
 *          description: user email
 *          format: email
 *        phone:
 *          type: string
 *          description: contact telephone number
 *        mainStreet:
 *          type: string
 *          description: main street address
 *        secondaryStreet:
 *          type: string
 *          description: secondary street address
 *        entity:
 *          type: string
 *          description: ID entity reference
 *        createdAt:
 *          type: Date
 *          readOnly: true
 *        updatedAt:
 *          type: Date
 *          readOnly: true
 *      required:
 *        - email
 *        - phone
 *        - mainStreet
 *        - entity
 *      example:
 *        phone: 0987654321
 *        email: user@correo.ec
 *        mainStreet: av solis
 *        entity: 62d6e3e9e136288b9fa88785
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
 * address:
 *  name: Addresses
 *  description: Addresses endpoint
 */
