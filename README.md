# Condition Editor

This is my solution for the Condition Editor challenge. The project is deployed [here](https://humbruno.github.io/condition-editor/) and the source code can be viewed [here](https://github.com/humbruno/condition-editor)

## 💻 Objective

The objective of this application is to enable users to filter a collection of products by choosing from a selection of pre-defined conditions. Users begin by choosing a property to filter, then selecting an operator (depending on the property type). If necessary, they provide textual input or select an option from a dropdown menu for specific operators. Once the user has built a complete condition, the filter can be applied and the product list will refresh and display only matchin items.

## 🔌 Technologies used for this project:

- [Vite (React)](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [TypeScript](https://www.typescriptlang.org/)

### 📌 Why React?

My initial ambition was to develop this project using Ember, however, the learning curve of a new framework would add significanly more development time to the project, and so I defaulted to using React as it is a technology I'm already well comfortable with, as it allowed me to focus entirely on the software architecture side of the challenge, rather than how to implement it using X framework.

In total, this project took me approximately 25 hours to plan, develop and test.

## 📖 My process

The very first thing I do when starting a new development cycle (be it either for a fully-fledged application, or simply adding a new feature to an existing one) is to try and visualize how the functionaly should interact with itself. For example, the challenge contains a list of valid operators for each property type (for example, the `GREATER_THAN` operator is only valid for properties of type `number`), and I find it helpful to have these relationships laid out in front of me in a visual manner.

To accomplish this, my go-to tool is Excalidraw, which is a browser-based drawing tool (to put it simply) that allows me to quickly create diagrams or any other form of visual-representation of data.

This approach not only helps me better understand the problem, but also divide it into smaller components, which I find essential before starting to write any code.

Sometimes, starting right away with the code can be helpful, but more often than not, i find that it leads to refactoring which could have been avoided with some planning.

After having a good idea of what I needed to build in my head, I started a bare-bones React application using Vite as the bundler. I wanted to rely as little as possible on external libraries for this, and so, the only external component I used was React-Select, simply to save me the headache of building a custom dropdown component that would allow me to select more than one value at a time, which I learned I would be needing from my initial planning of the project.

From there on, I started tackling the filter component, as my main concern was: How do I allow only certain operators for certain property types?
To solve this, I created a map object, which uses the property type as the key, and the value is an array of possible operators for each property type.

I liked this approach as it allowed me to dynamically render the property and operator dropdowns, and it also provided my with scalability in case we ever wanted to expand the possible operators for each property in the future, which meant we only have to update that array so it would reflect on the rest of the application.

Once I got the dropdowns working as intended, as well as the input for the value, I started tackling the table of products. This proved to be more of a challenge than what I initially thought. The reason for this is because I like to build my applications with as little hard-coding as possible, which was also limited by one of the explanations of the challenge: "Properties and Products vary from customer to customer, you cannot depend on having the same properties or products available each time this application loads".

This meant that I had to find a way to be able to loop through a list of any products (not only the ones provided by the challenge) and dynamically find the product's property that had a matching ID with the property selected in the filter. Once I got that working, the next challenge was: How do I put both the property and the value through the operator?

Turns out I was overthinking this second part, and as I eventually found out, all I needed was to apply a switch statement to the operator and return a boolean from each case, since I was doing this inside a `filter` method on the array of products, meaning any values that returned `true` would be kept in the array of filtered products.

With the app fully operational, it was time to tackle the tests. For testing I used a combination of React Testing Library and Vitest. I opted to have a higher coverage of acceptance tests, rather than testing each component individually. Since the bread and butter of the application is the filtering of the product list, that was my main focus with the tests. Admittedly, testing is not my strongest suit so this was definitely a huge learning experience for me.

With everything done, I did my best to clean up some of the code (mostly remove duplications) and apply some styling so that the application would look minimally good and not just a bare-bones wireframe.

Following this, I knew I wanted to deploy the application and so I took advantage of GitHub actions to create two flows: One to run all of the application tests and generate a coverage report for each pull request opened in the repository, and another to automatically deploy the application for every push on the `main` branch. This CI-CD approach is one of my most recent skills, so it was definitely great to put it to more practive here.

## 🎓 What I've learned

The testing process was by far my biggest takeaway from this. Although I'm not completely fluent in testing, and it's something I'm actively working on improving, I learned the importance of having tests DURING development, rather than leaving them as an afterthought. While I was polishing my code towards the end, having the tests running on my terminal everytime I made a change was a HUGE benefit to make sure I wasn't breaking anything, and I only wished I wrote the tests as I developed these features, rather than developing everything first and only testing afterwards.

## 📥 Installing and executing

You will need the following installed on your machine:

- Git
- Node (version >= 16)

Clone this repository and access the directory.

```bash
# Instaling dependencies
$ npm install
or
$ npm ci

# Executing the application locally
$ npm run dev

# Executing the tests
$ npm run test

# Building the production bundle
$ npm run build
```
