import { CadernetaDesktopPage } from './app.po';

describe('caderneta-desktop App', function() {
  let page: CadernetaDesktopPage;

  beforeEach(() => {
    page = new CadernetaDesktopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
