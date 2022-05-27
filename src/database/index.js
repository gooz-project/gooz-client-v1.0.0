const register = (data) => {
  let list = [];

  const storage = localStorage.getItem("data");

  if (storage !== null) {
    list = JSON.parse(storage);
  }

  list.push(data);
  localStorage.setItem("data", JSON.stringify(list));
};

const read = () => {
  return JSON.parse(localStorage.getItem("data"));
};

const remove = (idx) => {
  const workspaces = read();
  workspaces.splice(idx, 1);
  localStorage.setItem("data", JSON.stringify(workspaces));
};

const registerWidget = (workspace, id, widgetName) => {
  const list = read();

  list.splice(id, 1, {
    workspaceName: workspace.workspaceName,
    cardName: workspace.cardName,
    cardType: workspace.cardType,
    connectionType: workspace.connectionType,
    connectionAddress: workspace.connectionAddress,
    widgets: [...workspace.widgets, widgetName],
  });

  localStorage.setItem("data", JSON.stringify(list));
};

const removeWidget = (workspace, id, idx) => {
  const list = read();
  const widgetList = workspace.widgets;

  widgetList.splice(idx, 1);

  list.splice(id, 1, {
    workspaceName: workspace.workspaceName,
    cardName: workspace.cardName,
    cardType: workspace.cardType,
    connectionType: workspace.connectionType,
    connectionAddress: workspace.connectionAddress,
    widgets: widgetList,
  });

  localStorage.setItem("data", JSON.stringify(list));
};

module.exports = { register, read, remove, registerWidget, removeWidget };
