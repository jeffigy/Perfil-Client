import {
  EntityState,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { apiSlice } from "app/api/apiSlice";
import { RootState } from "app/store";
import { User } from "types/User";

const usersAdapter = createEntityAdapter<User>({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<EntityState<User, string>, void>({
      query: () => ({
        url: "/users",
        validateStatus: (Response, result) => {
          return Response.status === 200 && !result.isError;
        },
      }),
      keepUnusedDataFor: 5,
      transformResponse: (responseData: User[]) => {
        return usersAdapter.setAll(initialState, responseData);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            ...result.ids.map((id) => ({ type: "User" as const, id })),
            { type: "User", id: "LIST" },
          ];
        } else {
          return [{ type: "User", id: "LIST" }];
        }
      },
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data, // normalized state object iwth ids and entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserids,
} = usersAdapter.getSelectors<RootState>(
  (state) => selectUsersData(state) ?? initialState,
);
