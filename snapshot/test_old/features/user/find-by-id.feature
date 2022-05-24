Feature: find User by id
  In order to find user by id
  As an user
  I need to be able to find one User

  Background:
  Given I have the following data on collection "users"
  """
    [
      {
        "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
        "name": "User A"
      }
    ]
    """


  Scenario: find one user
    Given I make a request to graphql
    """
    query{
      user(id: "daf673b7-b1ba-415e-ac5e-04848e5e2e5f"){
        id
        name
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "user": {
            "id": "daf673b7-b1ba-415e-ac5e-04848e5e2e5f",
            "name": "User A"
         }
      }
    }
    """
    Then response should have a status 200


  Scenario: find user not exist
    Given I make a request to graphql
    """
    query{
      user(id: "daf673b7-b1ba-415e-ac5e-04848e5e2e6f"){
        id
        name
      }
    }
    """
    And I validate the response is
    """
    {
      "data": {
        "user": null
      }
    }
    """
    Then response should have a status 200
