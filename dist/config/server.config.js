"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    const port = process.env.PORT;
    return {
        port,
        serverUrl: `http://localhost:${port}/api/`
    };
};
//# sourceMappingURL=server.config.js.map