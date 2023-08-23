import { mount } from "cypress-react-unit-test";

Cypress.Commands.add("mountReactComponent", (component, props = {}) => {
  mount(component, { props });
});
