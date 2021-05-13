/* eslint-disable no-undef */
/* eslint-disable jest/no-jasmine-globals */

import JasmineDOM from "@testing-library/jasmine-dom/dist";

beforeAll(() => {
  jasmine.getEnv().addMatchers(JasmineDOM);
});
