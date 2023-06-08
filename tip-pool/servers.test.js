describe("Servers test, with setup and tear-down", function () {
  beforeEach(function () {
    // initialization logic
    // console.log("Running servers setup");
    serverNameInput.value = "Alice";
  });

  it("should add a new server to allServers on submitServerInfo()", function () {
    console.log("Servers test - submitServerInfo()");
    submitServerInfo();

    expect(Object.keys(allServers).length).toBe(1);
    expect(allServers["server" + serverId].serverName).toEqual("Alice");
  });

  it("shouldn't add a new server if submitServerInfo() has empty input", function () {
    console.log("Servers test - submitServerInfo() with empty input");

    serverNameInput.value = "";
    submitServerInfo();

    expect(Object.keys(allServers).length).toBe(0);
  });

  it("should update #serverTable when updateServerTable() is called", function () {
    console.log("Servers test - updateServerTable()");

    submitServerInfo();
    updateServerTable();

    let currentTdList = document.querySelectorAll("#serverTable tbody tr td");

    expect(currentTdList.length).toBe(3);
    expect(currentTdList[0].innerText).toBe("Alice");
    expect(currentTdList[1].innerText).toBe("$0.00");
    expect(currentTdList[2].innerText).toBe("X");
  });

  afterEach(function () {
    // console.log("Running servers tear-down");
    serverId = 0;
    serverTbody.innerHTML = "";
    allServers = {};
  });
});