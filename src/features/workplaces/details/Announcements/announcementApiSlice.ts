import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
import { apiSlice } from "app/api/apiSlice";
import { RootState } from "app/store";
import { Announcement } from "types/Announcement";

const announcementsAdapter = createEntityAdapter<Announcement>({});
const initialState = announcementsAdapter.getInitialState();

export const announcementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnnouncements: builder.query<EntityState<Announcement>, string | void>({
      query: () => ({
        url: "/announcements",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Announcement[]) => {
        return announcementsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Announcement", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Announcement" as const, id })),
          ];
        } else {
          return [{ type: "Announcement", id: "LIST" }];
        }
      },
    }),
    getAnnouncmentsByWorkplaceId: builder.query({
      query: (id) => ({
        url: `/announcements/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Announcement[]) => {
        return announcementsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Announcement", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Announcement" as const, id })),
          ];
        } else {
          return [{ type: "Announcement", id: "LIST" }];
        }
      },
    }),
    addNewAnnouncement: builder.mutation({
      query: (initialAnnouncementData) => ({
        url: "/announcements",
        method: "POST",
        body: {
          ...initialAnnouncementData,
        },
      }),
      invalidatesTags: [{ type: "Announcement", id: "LIST" }],
    }),
    deleteAnnouncement: builder.mutation({
      query: ({ id }) => ({
        url: "/announcements",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (arg) => [{ type: "Announcement", id: arg.id }],
    }),
  }),
});

export const {
  useGetAnnouncementsQuery,
  useGetAnnouncmentsByWorkplaceIdQuery,
  useAddNewAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = announcementApiSlice;

export const selectAnnouncementsResult =
  announcementApiSlice.endpoints.getAnnouncements.select();

const selectAnnouncementsData = createSelector(
  selectAnnouncementsResult,
  (announcementsResult) => announcementsResult.data,
);

export const { selectAll, selectById, selectIds } =
  announcementsAdapter.getSelectors<RootState>(
    (state) => selectAnnouncementsData(state) ?? initialState,
  );
