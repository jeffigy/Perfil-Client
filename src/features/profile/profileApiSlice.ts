import { apiSlice } from "app/api/apiSlice";

const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/profile/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Patient", id: arg.id },
        { type: "User", id: arg.id },
      ],
    }),
    updateDetails: builder.mutation({
      query: (data) => ({
        url: "/profile/update-details",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Patient", id: arg.id },
        { type: "User", id: arg.id },
      ],
    }),
  }),
});

export const { useUpdateProfileMutation, useUpdateDetailsMutation } =
  profileApiSlice;
