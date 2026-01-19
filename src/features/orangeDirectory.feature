@directory
Feature: To contain the scenarios related to directory page of Orange HRM.

    Background: Goto website and login
        Given the user is on the OrangeHRM login page
        Given the user is logged into OrangeHRM


    @cleanup
    Scenario Outline: User searches for an employee by name
        Given I create an employee with name "<Employee>"
        When I click on "directory" menu
        Then I should be in the "Directory" page
        When the user enters "<Employee>" into the Name field
        And the user clicks the "Search" button
        Then the system should display results containing "<Employee>"

        Examples:
            | Employee          |
            | MORTICON IMPERIUS |

    @cleanup
    Scenario: User searches for employees by job title
        Given I create an job title with name "<JobTitle>"
        And I create an employee with name "<Employee>"
        And I map the job title "<JobTitle>" with employee "<Employee>"
        When I click on "directory" menu
        Then I should be in the "Directory" page
        When the user selects "<JobTitle>" from the Job Title dropdown
        And the user clicks the "Search" button
        Then the system should display employees with the job title "<JobTitle>"

        Examples:
            | Employee      | JobTitle     |
            | KORAGG CRUGER | POWER RANGER |
