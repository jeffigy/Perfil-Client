import {
  EntityState,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { apiSlice } from "app/api/apiSlice";
import { RootState } from "app/store";
import { Patient } from "types/Patient";

const patientsAdapter = createEntityAdapter<Patient>({});

const initialState = patientsAdapter.getInitialState();

export const patientsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatients: builder.query<EntityState<Patient, string>, void>({
      query: () => ({
        url: "/patients",
        validateStatus: (Response, result) => {
          return Response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Patient[]) => {
        return patientsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            ...result.ids.map((id) => ({ type: "Patient" as const, id })),
            { type: "Patient", id: "LIST" },
          ];
        } else {
          return [{ type: "Patient", id: "LIST" }];
        }
      },
    }),
  }),
});

export const { useGetPatientsQuery } = patientsApiSlice;

// returns the query result object
export const selectPatientsResult =
  patientsApiSlice.endpoints.getPatients.select();

// memoized selector
const selectPatientsData = createSelector(
  selectPatientsResult,
  (patientsResult) => patientsResult.data, // normalized state object iwth ids and entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPatients,
  selectById: selectPatientById,
  selectIds: selectPatientids,
} = patientsAdapter.getSelectors<RootState>(
  (state) => selectPatientsData(state) ?? initialState,
);
