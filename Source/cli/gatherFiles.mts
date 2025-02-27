import { dirname, isAbsolute, join } from "path";
import { glob } from "glob";
import { minimatch } from "minimatch";

import { args } from "../bin.mjs";
import { TestConfiguration } from "../config.cjs";

/** Gathers test files that match the config */
export async function gatherFiles(path: string, config: TestConfiguration) {
	const fileListsProms: (string[] | Promise<string[]>)[] = [];
	const cwd = dirname(path);
	const ignoreGlobs = args.ignore?.map(String).filter((p) => !isAbsolute(p));
	for (const file of config.files instanceof Array
		? config.files
		: [config.files]) {
		if (isAbsolute(file)) {
			if (!ignoreGlobs?.some((i) => minimatch(file, i))) {
				fileListsProms.push([file]);
			}
		} else {
			fileListsProms.push(
				glob(file, { cwd, ignore: ignoreGlobs }).then((l) =>
					l.map((f) => join(cwd, f)),
				),
			);
		}
	}

	const files = new Set((await Promise.all(fileListsProms)).flat());
	args.ignore?.forEach((i) => (files as Set<string | number>).delete(i));
	return [...files];
}
