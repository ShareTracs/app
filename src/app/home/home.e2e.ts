import {browser, element, by, By, ExpectedConditions} from 'protractor';

describe('App', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/#/home');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Kalango';
    expect(subject).toEqual(result);
  });

  it('should have `Home` x-large', () => {
    let subject = element(by.css('[x-large]')).getText();
    let result  = 'Home';
    expect(subject).toEqual(result);
  });
});
