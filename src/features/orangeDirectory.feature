Feature: To contain the scenarios related to directory page of Orange HRM

    Background: Goto website and login
        Given the user is on the OrangeHRM login page
        Given the user is logged into OrangeHRM
        And I click on "directory" menu


    Scenario Outline: User searches for an employee by name
        When the user enters "<Employee>" into the Employee Name field
        And the user clicks the "Search" button
        Then the system should display results containing "<Employee>"

        Examples:
            | Employee        |
            | Yuvaraj Basenoo |
