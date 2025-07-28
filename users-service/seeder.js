"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const bcrypt = require("bcrypt");
const app_module_1 = require("./src/app.module");
const users_service_1 = require("./src/users/users.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const usersService = app.get(users_service_1.UsersService);
    const users = [
        {
            nombres: 'Juan',
            apellidos: 'Pérez',
            email: 'juan@example.com',
            alias: 'juanp',
            password: '123456',
            fecha_nacimiento: new Date('1990-01-01'),
        },
        {
            nombres: 'María',
            apellidos: 'López',
            email: 'maria@example.com',
            alias: 'marial',
            password: '123456',
            fecha_nacimiento: new Date('1992-06-15'),
        },
    ];
    for (const user of users) {
        const existing = await usersService.findByEmail(user.email);
        if (!existing) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await usersService.create({
                ...user,
                password: hashedPassword,
            });
            console.log(`Usuario ${user.email} creado`);
        }
        else {
            console.log(`Usuario ${user.email} ya existe`);
        }
    }
    await app.close();
}
bootstrap();
//# sourceMappingURL=seeder.js.map