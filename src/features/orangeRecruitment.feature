@recruitment
Feature: To handle the functionalities present in Recruitment page.
  Background: Goto website
    Given the user is on the OrangeHRM login page

  Scenario: User navigates to the Recruitment page
    Given the user is logged into OrangeHRM
    When I click on Recruitment menu
    Then I should be in the "Recruitment" page
@only
  Scenario: Successfully add a new candidate
    Given the user is logged into OrangeHRM
    And I click on Recruitment menu
    When the user clicks on the Add button
    And the user enters candidate first name "ALEXANDER" and last name "REYNOLDS"
    And the user enters email "alex.reynolds.qa@gmail.com"
    And the user selects a job vacancy "Senior QA Lead"
    And the user uploads a resume file
    And the user clicks the "Save" button
    Then a success message should be displayed "Successfully Saved"
    And the new candidate "ALEXANDER REYNOLDS" should appear in the candidate list

