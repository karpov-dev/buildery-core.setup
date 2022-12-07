import Dockerode from "dockerode";

export const docker = new Dockerode({socketPath: '/var/run/docker.sock'});