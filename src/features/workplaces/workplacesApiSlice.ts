import {
  EntityState,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { apiSlice } from "app/api/apiSlice";
import { RootState } from "app/store";
import { Workplace } from "types/Workplace";

const workplaceAdapter = createEntityAdapter<Workplace>({});

const initialState = workplaceAdapter.getInitialState();

export const workplacesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWorkplaces: builder.query<EntityState<Workplace>, string | void>({
      query: () => ({
        url: "/workplaces",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Workplace[]) => {
        return workplaceAdapter.setAll(initialState, responseData);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Workplace", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Workplace" as const, id })),
          ];
        } else {
          return [{ type: "Workplace", id: "LIST" }];
        }
      },
    }),
    addNewWorkplace: builder.mutation({
      query: (initialData) => ({
        url: "/workplaces",
        method: "POST",
        body: { ...initialData },
      }),
      invalidatesTags: [{ type: "Workplace", id: "LIST" }],
    }),
    updateWorkplace: builder.mutation({
      query: (initialData) => ({
        url: "/workplaces",
        method: "PATCH",
        body: {
          ...initialData,
        },
      }),
      invalidatesTags: (arg) => [{ type: "Workplace", id: arg.id }],
    }),
    deleteWorkplace: builder.mutation({
      query: ({ id }) => ({
        url: `/workplaces`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (arg) => [{ type: "Workplace", id: arg.id }],
    }),
  }),
});

export const {
  useGetWorkplacesQuery,
  useAddNewWorkplaceMutation,
  useUpdateWorkplaceMutation,
  useDeleteWorkplaceMutation,
} = workplacesApiSlice;

export const selectWorkplacesResult =
  workplacesApiSlice.endpoints.getWorkplaces.select();

const selectWorkplacesData = createSelector(
  selectWorkplacesResult,
  (workplacesResult) => workplacesResult.data,
);

export const {
  selectAll: selectAllWorkplaces,
  selectById: selectWorkplaceById,
  selectIds: selectWorkplacesIds,
} = workplaceAdapter.getSelectors<RootState>(
  (state) => selectWorkplacesData(state) ?? initialState,
);
