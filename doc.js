export const swaggerDocument = {
  "openapi": "3.0.3",
  "info": {
    "title": "Bank API Node Express",
    "description": "This is a sample project with node and express. In future data will be used with graphQl",
    "version": "1.0.0"
  },
  "tags": [
    {
      "name": "account",
      "description": "account operation"
    }
  ],
  "paths": {
    "/account": {
      "get": {
        "tags": [
          "account"
        ],
        "summary": "Get all existing accounts",
        "description": "get all accounts",
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AccountAll"
                }
              }
            }
          },
          "400": {
            "description": "error occurred"
          }
        }
      },
      "post": {
        "tags": [
          "account"
        ],
        "summary": "Add a new account",
        "description": "Add a new account",
        "operationId": "addAccount",
        "requestBody": {
          "description": "Create a new account",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AccountAll"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Account"
                }
              }
            }
          },
          "400": {
            "description": "error occurred"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "AccountAll": {
        "type": "array",
        "items": {
          "properties": {
            "name": {
              "type": "string",
              "example": "doggie"
            },
            "balance": {
              "type": "number",
              "example": 200
            }
          }
        }
      },
      "Account": {
        "required": [
          "name",
          "balance"
        ],
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 10
          },
          "name": {
            "type": "string",
            "example": "doggie"
          },
          "balance": {
            "type": "number",
            "example": 200
          }
        }
      }
    }
  }
}