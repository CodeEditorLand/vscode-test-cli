/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import {
	IConfigurationWithGlobalOptions,
	TestConfiguration,
} from "./config.cjs";

export * from "./config.cjs";

// todo: can be removed if/when the extension uses Node16+ resolution
export * from "./fullJsonStreamReporterTypes.cjs";

type AnyConfiguration =
	| IConfigurationWithGlobalOptions
	| TestConfiguration
	| TestConfiguration[];
type AnyConfigurationOrPromise = AnyConfiguration | Promise<AnyConfiguration>;

export const defineConfig = (
	config: AnyConfigurationOrPromise | (() => AnyConfigurationOrPromise),
) => config;
