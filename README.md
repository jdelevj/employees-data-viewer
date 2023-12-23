

# Employees Data Viewer

## Table of Contents

- [About the Project](#about-the-project)

  - [The Task](#the-task)

  - [The Solution](#the-solution)

    - [Structure](#structure)
    
    - [Logical Solution](#logical-solution)

  - [Extras](#extras)

- [Technologies](#technologies)

- [Available Scripts](#available-scripts)

## About the Project

### The Task

This task is provided by Sirma Academy as a Finals Exam for the Frontend Course:

"Pair of employees who have worked together"

"Create an application that identifies the pair of employees who have worked together on common projects for the longest period of time and the time for each of those projects."

```
Input data:
  A CSV file with data in the following format:

    EmpID, ProjectID, DateFrom, DateTo
```

Specific requirements

1)	DateTo can be NULL, equivalent to today.
2)	We are interested in the number of days they worked together.
3)	The input data must be loaded to the program from a CSV file.
4)	More than one date format to be supported, extra points will be given if all date formats are supported.
5)	In a README.md file summarize your understanding for the task and your algorithm.
6)	Do not use external libraries for CSV parsing.
7)	Follow clean code conventions.
8)	Create a user friendly React application with ‘proper’ CSS styling.

Bonus

1)	Not using UI component libraries like MaterialUI
2)	Search/Filter Functionality
3)	Responsive Design

Delivery
1)	The task solution needs to be uploaded in GitHub.


### The Solution

#### Structure

The structure of the project is defined by "npx create-react-app" command. Most of the developer coding is situated in /src folder where additional folders are made:

    - /components - contains react components that are reusable or can be that in future development. There are styling files for the components that needed.
    - /context - for the context provider of the app.
    - /Data - contains different .csv files and some others for test puposes.
    - /fonts - contains fonts used in the app.
    - /hooks - contains custom hooks used in the app.
    - /pages - contains the view files.
    - /utils - contains files used for validations.


#### Logical solution

The algorithm used to determine Projects main task can be summarized as following:

  First, we group records by employee using reduce function (dataValidation.js -> nestedGrouping). Same function is used to group by projectId as well. E.g.:
  ```
    {
    [employeeId_1]: {
      id: employeeId_1,
      children: {
        [projectId_1]: {
          id: projectId_1,
          workingPeriods: [{from: dateFrom, to: dateTo}, ...]
        },
              [projectId_2]: ...
      }
    },
    [employeeId_2]: ...
    }
  ```

  Then run two nested loops by Object.keys of resulting object. Second loop starts from index of the first plus one making pairs of employees by matching each employee with all employees after it.
  This way we make grouping of all employees e.g. [employeeId_1, employeeId_2], [employeeId_1, employeeId_3], [employeeId_1, employeeId_4], [employeeId_2, employeeId_3], [employeeId_2, employeeId_4]
  For each project of the first employee (loop over Object.keys of children of first employee) of the pair we check if the second employee has the same project.
  If so, we do another nested loops by first employee project's working periods and second employee project's working periods and search for overlapping periods.
  If we find an overlapping period, we add the difference in days to a variable called workedTogether for each matching project.
  At the end we sum all workedTogether for all matching projects to get the final result for the employees pair.

  To find if two periods overlap we check if end date of any of the periods is before start date of the other period. If so, the periods does not overlap.
  Else we create new period, which start date is the max of the start dates of the both periods and end date which is the min of the end dates of the both periods.
  E.g.
```
 1 |------------------------| 10 (First period)
         3 |----------------------------------| 17 (Second period)
         3 |----------------| 10 (Overlapping period)
```

Number of days in a period is calculated by subtracting start date from end date, divide by 1000ms * 60sec * 60min * 24h (milliseconds in a day) and add 1 to make the difference inclusive.

### Extras

The app offers additional functionality as:

  - visualizing all uploaded data as raw in Home page and filtering it by Employee Id, Project Id or Date.
  - an Employees page visualizing all employees grouped with all the projects they take part in with the respective periods.
  - a Projects page visualizing all projects grouped with all the employees taking part in with the respective periods.
  - a Drag and Drop area for additional way of uploading data file.
  - the app design is tested under 600px width and responsive so it can be viewed with no loss of data or elements on mobile devices.


## Technologies

The technologies used in this project are HTML, JavaScript and CSS.

React as library is the bedrock of this project with additional library of react-router-dom installed.


## Available Scripts

In the project directory, you can run:
### `npm start`

Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

### `npm run build`

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

### `npm run eject`

Note: this is a one-way operation. Once you eject, you can't go back!

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the Create React App documentation.

To learn React, check out the React documentation.

## Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

## Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

## Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

## Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

## Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

## npm run build fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

