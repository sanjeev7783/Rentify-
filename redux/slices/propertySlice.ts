import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Property {
  id: number
  title: string
  description: string
  city: string
  type: string
  price: number
  images: string[]
  ownerId: number
  highlight: boolean
  datePosted: string
  verified: boolean
  availability: "Available" | "Not Available"
}

interface PropertyState {
  properties: Property[]
  topProperties: Property[]
  recentProperties: Property[]
  selectedProperty: Property | null
  loading: boolean
  filters: {
    city: string
    type: string
    minPrice: number
    maxPrice: number
  }
}

const initialState: PropertyState = {
  properties: [],
  topProperties: [],
  recentProperties: [],
  selectedProperty: null,
  loading: false,
  filters: {
    city: "",
    type: "",
    minPrice: 0,
    maxPrice: 5000,
  },
}

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setProperties: (state, action: PayloadAction<Property[]>) => {
      state.properties = action.payload
    },
    setTopProperties: (state, action: PayloadAction<Property[]>) => {
      state.topProperties = action.payload
    },
    setRecentProperties: (state, action: PayloadAction<Property[]>) => {
      state.recentProperties = action.payload
    },
    setSelectedProperty: (state, action: PayloadAction<Property | null>) => {
      state.selectedProperty = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<PropertyState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
  },
})

export const { setProperties, setTopProperties, setRecentProperties, setSelectedProperty, setLoading, setFilters } =
  propertySlice.actions
export default propertySlice.reducer
