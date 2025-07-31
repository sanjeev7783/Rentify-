import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Appointment {
  id: number
  propertyId: number
  userId: number
  ownerId: number
  status: "pending" | "confirmed" | "cancelled"
  scheduledDate: string
  timestamp: string
}

interface AppointmentState {
  appointments: Appointment[]
  userAppointments: Appointment[]
  ownerAppointments: Appointment[]
  loading: boolean
}

const initialState: AppointmentState = {
  appointments: [],
  userAppointments: [],
  ownerAppointments: [],
  loading: false,
}

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.appointments = action.payload
    },
    setUserAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.userAppointments = action.payload
    },
    setOwnerAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.ownerAppointments = action.payload
    },
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments.push(action.payload)
      state.userAppointments.push(action.payload)
    },
    updateAppointment: (state, action: PayloadAction<Appointment>) => {
      const index = state.appointments.findIndex((apt) => apt.id === action.payload.id)
      if (index !== -1) {
        state.appointments[index] = action.payload
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const {
  setAppointments,
  setUserAppointments,
  setOwnerAppointments,
  addAppointment,
  updateAppointment,
  setLoading,
} = appointmentSlice.actions
export default appointmentSlice.reducer
