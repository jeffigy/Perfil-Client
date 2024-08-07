import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
import { apiSlice } from "app/api/apiSlice";
import { Appointment } from "types/Appointment";
import { RootState } from "app/store";

const appointmentsAdapter = createEntityAdapter<Appointment>({});
const initialState = appointmentsAdapter.getInitialState();

export const appointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query<EntityState<Appointment>, string | void>({
      query: () => ({
        url: "/appointments",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Appointment[]) => {
        return appointmentsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Appointment", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Appointment" as const, id })),
          ];
        } else {
          return [{ type: "Appointment", id: "LIST" }];
        }
      },
    }),
    getAppointmentsByWorkplaceId: builder.query({
      query: (id) => ({
        url: `/appointments/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Appointment[]) => {
        return appointmentsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Appointment", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Appointment" as const, id })),
          ];
        } else {
          return [{ type: "Appointment", id: "LIST" }];
        }
      },
    }),
    addNewAppointment: builder.mutation({
      query: (initialAppointmentData) => ({
        url: "/appointments",
        method: "POST",
        body: {
          ...initialAppointmentData,
        },
      }),
      invalidatesTags: [{ type: "Appointment", id: "LIST" }],
    }),
    deleteAppointment: builder.mutation({
      query: ({ id }) => ({
        url: "/appointments",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (arg) => [{ type: "Appointment", id: arg.id }],
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useGetAppointmentsByWorkplaceIdQuery,
  useAddNewAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentApiSlice;

export const selectAppointmentsResult =
  appointmentApiSlice.endpoints.getAppointments.select();

const selectAppointmentsData = createSelector(
  selectAppointmentsResult,
  (appointmentsResult) => appointmentsResult.data,
);

export const { selectAll, selectById, selectIds } =
  appointmentsAdapter.getSelectors<RootState>(
    (state) => selectAppointmentsData(state) ?? initialState,
  );
