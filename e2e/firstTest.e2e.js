describe("Example", () => {
  beforeAll(async () => {
    await device.launchApp();
    await device.reloadReactNative();
  });

  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  it("should login successfully", async () => {
    await expect(element(by.id("LoginScreen"))).toBeVisible();
  });

  it("should display Dashboard screen after tap", async () => {
    // await element(by.id("LoginButton")).tap();
    await element(by.id("LostPasswordButton")).tap();

    // await element(by.text("connecter")).tap();
    // await expect(element(by.id("DashBoardScreen"))).toBeVisible();
    //   await waitFor(element(by.id("DashBoardScreen")))
    //     .toBeVisible()
    //     .withTimeout(10000);
  });
  // it("should display Dashboard screen after tafdsfdsp", async () => {
  //   await expect(element(by.id("DashBoardScreen"))).toBeVisible();
  //   //   await waitFor(element(by.id("DashBoardScreen")))
  //   //     .toBeVisible()
  //   //     .withTimeout(10000);
  // });
});
