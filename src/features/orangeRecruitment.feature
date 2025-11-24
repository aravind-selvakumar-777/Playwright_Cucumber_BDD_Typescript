@recruitment
Feature: To handle the functionalities present in Recruitment page.
  Background: Goto website
    Given the user is on the OrangeHRM login page
    Given the user is logged into OrangeHRM
    And I click on Recruitment menu

  Scenario: User navigates to the Recruitment page
    Then I should be in the "Recruitment" page

  Scenario: Successfully add a new candidate
    When the user clicks on the Add button
    And the user enters candidate first name "ALEXANDER" and last name "REYNOLDS"
    And the user enters email "alex.reynolds.qa@gmail.com"
    And the user selects a job vacancy "Senior QA Lead"
    And the user uploads a resume file
    And the user clicks the "Save" button
    Then a success message should be displayed "Successfully Saved"
    And the new candidate "ALEXANDER REYNOLDS" should appear in the candidate list

  Scenario: Shortlist a candidate from the candidate list
    When the user finds and selects the candidate "ALEXANDER REYNOLDS"
    And the user clicks the "Shortlist" button
    And the user clicks the "Save" button
    Then the candidate status should update to "Shortlisted"

  Scenario: Edit an existing candidate
    Given the user finds and selects the candidate "ALEXANDER REYNOLDS"
    And the user clicks the Edit toggle button
    And the user updates the contact number to "9876543210"
    And the user clicks the "Save" button
    Then the updated contact number "9876543210" should be displayed in the candidate profile