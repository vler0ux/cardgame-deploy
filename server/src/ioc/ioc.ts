import { Container, injectable } from "inversify";

import { IocDals } from "./ioc.dals";
import { IocServices } from "./ioc.services";

@injectable()
export class Ioc {
    static register(): Container {
        const container: Container = new Container();
        IocDals.register(container);
        IocServices.register(container);
        return container;
    }
}