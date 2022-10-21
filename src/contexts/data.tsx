import { createContext, useContext } from "solid-js";
import { Atom } from "solid-use";
import { createStore } from "solid-js/store";
import Dexie, { Table } from "dexie";
import { Job, Result } from "selas/index";
import { createDexieArrayQuery } from "solid-dexie";

export class ScryprDexie extends Dexie {
  results: Table<Result>;
  jobs: Table<Job>;

  constructor() {
    super("scrypr");
    this.version(1).stores({
      results: "++id, job_id, user_id, uri, blurhash, text_data, data_type, created_at",
      jobs: "++id, created_at, status, user_id, accepted_at, completed_at, worker_name",
    });
  }
}

const DataContext = createContext<{
  db: ScryprDexie;
  results: Result[];
  jobs: Job[];
  addResult: (r: Result) => Promise<void>;
  addJob: (j: Job) => Promise<void>;
}>();

export function DataProvider(props) {
  const db = new ScryprDexie();

  const results = createDexieArrayQuery(() => db.results.orderBy("created_at").toArray());

  const jobs = createDexieArrayQuery(() => db.jobs.toArray());

  const addResult = async (result: Result) => {
    const id = await db.results.add(result);
  };

  const addJob = async (job: Job) => {
    const id = await db.jobs.add(job);
  };

  return <DataContext.Provider value={{ db, results, jobs, addResult, addJob }}>{props.children}</DataContext.Provider>;
}

export const useData = () => {
  return useContext(DataContext);
};
