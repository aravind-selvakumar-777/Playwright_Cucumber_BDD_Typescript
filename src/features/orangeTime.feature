@time
Feature: To contain the scenarios related to time page of Orange HRM.

    Background: Goto website and login
        Given the user is on the OrangeHRM login page
        Given the user is logged into OrangeHRM


    Scenario: User navigates to the Time module
        When I click on "time" menu
        Then I should be in the "Time" page

    @cleanup
    Scenario: User searches for an employee timesheet with no records
        Given I create an employee with name "<Employee>"
        And I click on "time" menu
        Then I should be in the "Time" page
        When the user enters "<Employee>" into the Name field
        And the user clicks the "View" button
        Then the system should display the timesheet for "<Employee>"
        And "No Timesheets Found" alert message should be displayed
        Examples:
            | Employee          |
            | MERCEDES ASHSTONE |

    @cleanup
    Scenario: Add timesheet for an employee current week for the User and submit and approve an empty timesheet
        Given I create an employee with name "<Employee>"
        And I click on "time" menu
        Then I should be in the "Time" page
        When the user enters "<Employee>" into the Name field
        And the user clicks the "View" button
        Then the system should display the timesheet for "<Employee>"
        When the user clicks the "Create Timesheet" button
        Then a success message should be displayed "Timesheet Successfully Created"
        And an empty timesheet with message "No Records Found" should be present
        When the user clicks the "Submit" button
        And the user clicks the "Approve" button
        Then status should show as "Approved"
        Examples:
            | Employee         |
            | MAXIMUS ORACLEON |

    @cleanup
    Scenario: Add a customer
        Given I click on "time" menu
        Then I should be in the "Time" page
        When the user clicks on "Project Info" and selects "Customers"
        And the user clicks the "Add" button
        And adds "OSCORP SYSTEMS" in customer Name field
        And the user clicks the "Save" button
        Then a success message should be displayed "Successfully Saved"
        And "OSCORP SYSTEMS" should appear in the first column of the list

    @cleanup
    Scenario: Add a project with activities for the customer
        Given I create an customer with name "<Customer>"
        And I click on "time" menu
        Then I should be in the "Time" page
        When the user clicks on "Project Info" and selects "Projects"
        And the user clicks the "Add" button
        And adds "<ProjectName>" in project Name field
        And the user enters "<Customer>" into the Name field
        And the user clicks the "Save" button
        Then a success message should be displayed "Successfully Saved"
        When the user clicks the "Add" button
        And adds "<Task>" in Name field of the popup box
        Then "<Task>" should appear in the first column of the list
        When the user clicks on "Project Info" and selects "Projects"
        Then "<ProjectName>" should appear in the second column of the list
        Examples:
            | Customer        | ProjectName     | Task      |
            | KINGSLAYER CORP | MONSTER SLAYING | EXPANSION |

    Scenario: Verfiy if the timesheet period displayed is of current week
        Given I click on "time" menu
        Then I should be in the "Time" page
        When the user clicks on "Timesheets" and selects "my Timesheets"
        And the user clicks the "Edit" button
        Then the timesheet period must be of current week, monday to sunday