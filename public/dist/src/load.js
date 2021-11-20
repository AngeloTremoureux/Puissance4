function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./modules/', true, /\.js$/));
requireAll(require.context('./modules/', true, /\.ts$/));
//# sourceMappingURL=load.js.map