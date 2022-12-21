import {commonMicroservices} from "../../config";
import {AbstractSetupContainer, SetupMicroservice} from "../setup-container-types";
import {IWorkspace} from "../../types";
import {NetworkManager, NetworkService} from "../network";
import {ContainerManager, ContainerService} from "../container";

export const preventDuplicateWorkspace = async (workspace: IWorkspace) => {
  for (let microservice of commonMicroservices) {
    const containerName = ContainerService.getContainerName(workspace, microservice);
    const isContainerExist = ContainerService.isContainerExist(containerName);

    if (isContainerExist) {
      await ContainerManager.removeByName(containerName);
    }
  }

  const isNetworkExist = NetworkService.isNetworkExist(workspace.domain);

  if (isNetworkExist) {
    await NetworkManager.removeByName(workspace.domain);
  }
}

export const createWorkspaceNetwork = async (workspace: IWorkspace) => {
  await NetworkService.createNetwork(workspace);
}

export const getMicroservicesSetups = (workspace: IWorkspace) => {
  return commonMicroservices.map(commonMicroservice => {
    return new SetupMicroservice(workspace, commonMicroservice)
  }) as Array<AbstractSetupContainer>;
}