(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[turbopack-node]_transforms_webpack-loaders_ts_9b1de4._.js", {

"[turbopack-node]/transforms/webpack-loaders.ts [webpack_loaders] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>transform
});
var __TURBOPACK__commonjs__external__path__ = __turbopack_external_require__("path", true);
var __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$compiled$2f$stacktrace$2d$parser$2f$index$2e$js__$5b$webpack_loaders$5d$__$28$ecmascript$29$__ = __turbopack_import__("[turbopack-node]/compiled/stacktrace-parser/index.js [webpack_loaders] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
let runLoaders;
try {
    ({ runLoaders } = require("next/dist/compiled/loader-runner"));
} catch  {
    ({ runLoaders } = __turbopack_external_require__("loader-runner"));
}
const contextDir = process.cwd();
const toPath = (file)=>{
    const relPath = (0, __TURBOPACK__commonjs__external__path__["relative"])(contextDir, file);
    if ((0, __TURBOPACK__commonjs__external__path__["isAbsolute"])(relPath)) {
        throw new Error(`Cannot depend on path (${file}) outside of root directory (${contextDir})`);
    }
    return __TURBOPACK__commonjs__external__path__["sep"] !== "/" ? relPath.replaceAll(__TURBOPACK__commonjs__external__path__["sep"], "/") : relPath;
};
const fromPath = (path)=>{
    return (0, __TURBOPACK__commonjs__external__path__["join"])(contextDir, __TURBOPACK__commonjs__external__path__["sep"] !== "/" ? path.replaceAll("/", __TURBOPACK__commonjs__external__path__["sep"]) : path);
};
const LogType = Object.freeze({
    error: "error",
    warn: "warn",
    info: "info",
    log: "log",
    debug: "debug",
    trace: "trace",
    group: "group",
    groupCollapsed: "groupCollapsed",
    groupEnd: "groupEnd",
    profile: "profile",
    profileEnd: "profileEnd",
    time: "time",
    clear: "clear",
    status: "status"
});
const loaderFlag = "LOADER_EXECUTION";
const cutOffByFlag = (stack, flag)=>{
    const errorStack = stack.split("\n");
    for(let i = 0; i < errorStack.length; i++){
        if (errorStack[i].includes(flag)) {
            errorStack.length = i;
        }
    }
    return errorStack.join("\n");
};
/**
 * @param stack stack trace
 * @returns stack trace without the loader execution flag included
 */ const cutOffLoaderExecution = (stack)=>cutOffByFlag(stack, loaderFlag);
class DummySpan {
    traceChild() {
        return new DummySpan();
    }
    traceFn(fn) {
        return fn(this);
    }
    async traceAsyncFn(fn) {
        return await fn(this);
    }
    stop() {
        return;
    }
}
const SUPPORTED_RESOLVE_OPTIONS = new Set([
    "alias",
    "aliasFields",
    "conditionNames",
    "descriptionFiles",
    "extensions",
    "exportsFields",
    "mainFields",
    "mainFiles",
    "modules",
    "restrictions",
    "preferRelative",
    "dependencyType"
]);
const transform = (ipc, content, name, loaders)=>{
    return new Promise((resolve, reject)=>{
        const resource = (0, __TURBOPACK__commonjs__external__path__["resolve"])(contextDir, name);
        const resourceDir = (0, __TURBOPACK__commonjs__external__path__["dirname"])(resource);
        const loadersWithOptions = loaders.map((loader)=>typeof loader === "string" ? {
                loader,
                options: {}
            } : loader);
        runLoaders({
            resource,
            context: {
                _module: {
                    // For debugging purpose, if someone find context is not full compatible to
                    // webpack they can guess this comes from turbopack
                    __reserved: "TurbopackContext"
                },
                currentTraceSpan: new DummySpan(),
                rootContext: contextDir,
                getOptions () {
                    const entry = this.loaders[this.loaderIndex];
                    return entry.options && typeof entry.options === "object" ? entry.options : {};
                },
                getResolve: (options)=>{
                    const rustOptions = {
                        aliasFields: undefined,
                        conditionNames: undefined,
                        noPackageJson: false,
                        extensions: undefined,
                        mainFields: undefined,
                        noExportsField: false,
                        mainFiles: undefined,
                        noModules: false,
                        preferRelative: false
                    };
                    if (options.alias) {
                        if (!Array.isArray(options.alias) || options.alias.length > 0) {
                            throw new Error("alias resolve option is not supported");
                        }
                    }
                    if (options.aliasFields) {
                        if (!Array.isArray(options.aliasFields)) {
                            throw new Error("aliasFields resolve option must be an array");
                        }
                        rustOptions.aliasFields = options.aliasFields;
                    }
                    if (options.conditionNames) {
                        if (!Array.isArray(options.conditionNames)) {
                            throw new Error("conditionNames resolve option must be an array");
                        }
                        rustOptions.conditionNames = options.conditionNames;
                    }
                    if (options.descriptionFiles) {
                        if (!Array.isArray(options.descriptionFiles) || options.descriptionFiles.length > 0) {
                            throw new Error("descriptionFiles resolve option is not supported");
                        }
                        rustOptions.noPackageJson = true;
                    }
                    if (options.extensions) {
                        if (!Array.isArray(options.extensions)) {
                            throw new Error("extensions resolve option must be an array");
                        }
                        rustOptions.extensions = options.extensions;
                    }
                    if (options.mainFields) {
                        if (!Array.isArray(options.mainFields)) {
                            throw new Error("mainFields resolve option must be an array");
                        }
                        rustOptions.mainFields = options.mainFields;
                    }
                    if (options.exportsFields) {
                        if (!Array.isArray(options.exportsFields) || options.exportsFields.length > 0) {
                            throw new Error("exportsFields resolve option is not supported");
                        }
                        rustOptions.noExportsField = true;
                    }
                    if (options.mainFiles) {
                        if (!Array.isArray(options.mainFiles)) {
                            throw new Error("mainFiles resolve option must be an array");
                        }
                        rustOptions.mainFiles = options.mainFiles;
                    }
                    if (options.modules) {
                        if (!Array.isArray(options.modules) || options.modules.length > 0) {
                            throw new Error("modules resolve option is not supported");
                        }
                        rustOptions.noModules = true;
                    }
                    if (options.restrictions) {
                    // TODO This is ignored for now
                    }
                    if (options.dependencyType) {
                    // TODO This is ignored for now
                    }
                    if (options.preferRelative) {
                        if (typeof options.preferRelative !== "boolean") {
                            throw new Error("preferRelative resolve option must be a boolean");
                        }
                        rustOptions.preferRelative = options.preferRelative;
                    }
                    return (lookupPath, request, callback)=>{
                        const promise = ipc.sendRequest({
                            type: "resolve",
                            options: rustOptions,
                            lookupPath: toPath(lookupPath),
                            request
                        }).then((unknownResult)=>{
                            let result = unknownResult;
                            if (result && typeof result.path === "string") {
                                return fromPath(result.path);
                            } else {
                                throw Error("Expected { path: string } from resolve request");
                            }
                        });
                        if (callback) {
                            promise.then((result)=>callback(undefined, result), (err)=>callback(err)).catch((err)=>{
                                ipc.sendError(err);
                            });
                        } else {
                            return promise;
                        }
                    };
                },
                emitWarning: makeErrorEmitter("warning", ipc),
                emitError: makeErrorEmitter("error", ipc),
                getLogger (name) {
                    const logFn = (logType, ...args)=>{
                        let trace;
                        switch(logType){
                            case LogType.warn:
                            case LogType.error:
                            case LogType.trace:
                            case LogType.debug:
                                trace = (0, __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$compiled$2f$stacktrace$2d$parser$2f$index$2e$js__$5b$webpack_loaders$5d$__$28$ecmascript$29$__["parse"])(cutOffLoaderExecution(new Error("Trace").stack).split("\n").slice(3).join("\n"));
                                break;
                        }
                        ipc.sendInfo({
                            type: "log",
                            time: Date.now(),
                            logType,
                            args,
                            trace
                        });
                    };
                    let timers;
                    let timersAggregates;
                    // See https://github.com/webpack/webpack/blob/a48c34b34d2d6c44f9b2b221d7baf278d34ac0be/lib/logging/Logger.js#L8
                    return {
                        error: logFn.bind(this, LogType.error),
                        warn: logFn.bind(this, LogType.warn),
                        info: logFn.bind(this, LogType.info),
                        log: logFn.bind(this, LogType.log),
                        debug: logFn.bind(this, LogType.debug),
                        assert: (assertion, ...args)=>{
                            if (!assertion) {
                                logFn(LogType.error, ...args);
                            }
                        },
                        trace: logFn.bind(this, LogType.trace),
                        clear: logFn.bind(this, LogType.clear),
                        status: logFn.bind(this, LogType.status),
                        group: logFn.bind(this, LogType.group),
                        groupCollapsed: logFn.bind(this, LogType.groupCollapsed),
                        groupEnd: logFn.bind(this, LogType.groupEnd),
                        profile: logFn.bind(this, LogType.profile),
                        profileEnd: logFn.bind(this, LogType.profileEnd),
                        time: (label)=>{
                            timers = timers || new Map();
                            timers.set(label, process.hrtime());
                        },
                        timeLog: (label)=>{
                            const prev = timers && timers.get(label);
                            if (!prev) {
                                throw new Error(`No such label '${label}' for WebpackLogger.timeLog()`);
                            }
                            const time = process.hrtime(prev);
                            logFn(LogType.time, [
                                label,
                                ...time
                            ]);
                        },
                        timeEnd: (label)=>{
                            const prev = timers && timers.get(label);
                            if (!prev) {
                                throw new Error(`No such label '${label}' for WebpackLogger.timeEnd()`);
                            }
                            const time = process.hrtime(prev);
                            /** @type {Map<string | undefined, [number, number]>} */ timers.delete(label);
                            logFn(LogType.time, [
                                label,
                                ...time
                            ]);
                        },
                        timeAggregate: (label)=>{
                            const prev = timers && timers.get(label);
                            if (!prev) {
                                throw new Error(`No such label '${label}' for WebpackLogger.timeAggregate()`);
                            }
                            const time = process.hrtime(prev);
                            /** @type {Map<string | undefined, [number, number]>} */ timers.delete(label);
                            /** @type {Map<string | undefined, [number, number]>} */ timersAggregates = timersAggregates || new Map();
                            const current = timersAggregates.get(label);
                            if (current !== undefined) {
                                if (time[1] + current[1] > 1e9) {
                                    time[0] += current[0] + 1;
                                    time[1] = time[1] - 1e9 + current[1];
                                } else {
                                    time[0] += current[0];
                                    time[1] += current[1];
                                }
                            }
                            timersAggregates.set(label, time);
                        },
                        timeAggregateEnd: (label)=>{
                            if (timersAggregates === undefined) return;
                            const time = timersAggregates.get(label);
                            if (time === undefined) return;
                            timersAggregates.delete(label);
                            logFn(LogType.time, [
                                label,
                                ...time
                            ]);
                        }
                    };
                }
            },
            loaders: loadersWithOptions.map((loader)=>({
                    loader: __turbopack_external_require__.resolve(loader.loader, {
                        paths: [
                            resourceDir
                        ]
                    }),
                    options: loader.options
                })),
            readResource: (_filename, callback)=>{
                // TODO assuming the filename === resource, but loaders might change that
                callback(null, Buffer.from(content, "utf-8"));
            }
        }, (err, result)=>{
            if (err) return reject(err);
            for (const dep of result.contextDependencies){
                ipc.sendInfo({
                    type: "dirDependency",
                    path: toPath(dep),
                    glob: "**"
                });
            }
            for (const dep of result.fileDependencies){
                ipc.sendInfo({
                    type: "fileDependency",
                    path: toPath(dep)
                });
            }
            if (!result.result) return reject(new Error("No result from loaders"));
            const [source, map] = result.result;
            resolve({
                source,
                map: typeof map === "string" ? map : typeof map === "object" ? JSON.stringify(map) : undefined
            });
        });
    });
};
;
function makeErrorEmitter(severity, ipc) {
    return function(error) {
        ipc.sendInfo({
            type: "emittedError",
            severity: severity,
            error: error instanceof Error ? {
                name: error.name,
                message: error.message,
                stack: (0, __TURBOPACK__imported__module__$5b$turbopack$2d$node$5d2f$compiled$2f$stacktrace$2d$parser$2f$index$2e$js__$5b$webpack_loaders$5d$__$28$ecmascript$29$__["parse"])(error.stack)
            } : {
                name: "Error",
                message: error,
                stack: []
            }
        });
    };
}

})()),
}]);

//# sourceMappingURL=%5Bturbopack-node%5D_transforms_webpack-loaders_ts_9b1de4._.js.map