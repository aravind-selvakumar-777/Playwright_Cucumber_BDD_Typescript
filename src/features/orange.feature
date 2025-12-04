@preStep
Feature: Contains pre-steps for other scenarios to generate test data
    Background: Goto website and login
        Given the user is on the OrangeHRM login page
        Given the user is logged into OrangeHRM

    Scenario Outline: To create new job titles
        When I click on "admin" menu
        And the user clicks on "Job" and selects "Job Titles"
        When the user clicks the "Add" button
        And adds "<Title>" in Name field
        And the user clicks the "Save" button
        Then a success message should be displayed "Successfully Saved"
        And "<Title>" should appear in the first column of the list
        Examples:
            | Title             |
            | MONSTER EXCAVATOR |



    Scenario Outline: To create an employee with job titles
        When I click on "pim" menu
        And the user clicks the "Add" button
        And the user enters candidate first name "<Firstname>" and last name "<Lastname>"
        And enters a random employee id
        And the user clicks the "Save" button
        Then the "Personal Details" page for the employee should be displayed along with name "<Fullname>"
        When the user clicks on "Job"
        And selects "<JobTitle>" as the Job Title field
        And the user clicks the "Save" button
        Then a success message should be displayed "Successfully Updated"
        Examples:
            | Firstname | Lastname | Fullname      | JobTitle           |
            | MARTIN    | THOMAS   | MARTIN THOMAS | MONSTER EXCAVATOR  | 


    Scenario Outline: MAp hiring manager & create new vacancies
        And I click on "recruitment" menu
        When the user clicks on "Vacancies"
        When the user clicks the "Add" button
        And adds "<Vacancyname>" in Name field
        And selects "<JobTitle>" as the Job Title field
        And the enters "MARTIN THOMAS" into the Hiring Manager field
        And the user clicks the "Save" button
        When I click on "recruitment" menu
        And the user clicks on "Vacancies"
        Then "<JobTitle>" should appear in the second column of the list
        Examples:
            | Vacancyname                   | JobTitle              | 
            | MONSTER EXCAVATOR SPECAILIST  | MONSTER EXCAVATOR     |