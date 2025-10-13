import { request, check, PERMISSIONS, RESULTS, PermissionStatus, Permission } from "react-native-permissions";
import Geolocation, { GeolocationResponse, GeolocationError } from "@react-native-community/geolocation";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LocationPermissionResult {
    success: boolean;
    granted: boolean;
    reason: string | null;
}

interface LocationCoords {
    latitude: number;
    longitude: number;
}

export default class LocationService {
    static getPermissionKey(): Permission {
        return PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    }

    static async requestLocationPermission(): Promise<LocationPermissionResult> {
        try {
            const permissionGranted: Permission = this.getPermissionKey();
            const result: PermissionStatus = await request(permissionGranted);

            const granted: boolean = result === RESULTS.GRANTED;
            if (granted) {
                await AsyncStorage.setItem("locationPermissionGranted", "true");
            }

            return {
                success: granted,
                granted,
                reason: granted ? null : "Permission denied",
            };
        } catch (error: any) {
            return {
                success: false,
                granted: false,
                reason: error.message || "Unknown error",
            };
        }
    }

    static async checkLocationPermission(): Promise<boolean> {
        try {
            const permissionGranted: Permission = this.getPermissionKey();
            const result: PermissionStatus = await check(permissionGranted);
            return result === RESULTS.GRANTED;
        } catch {
            return false;
        }
    }

    static async getCurrentLocation(): Promise<LocationCoords> {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                (position: GeolocationResponse) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error: GeolocationError) => reject(error),
                { enableHighAccuracy: true, timeout: 15000 }
            );
        });
    }

    static async saveLocationToBackend(location: LocationCoords) {
        try {
            const response = await fetch("http://localhost:3000/api/location", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(location),
            });

            if (response.ok) {
                console.log("Location saved successfully");
            } else {
                console.error("Failed to save location");
            }
        } catch (error) {
            console.error("Error saving location:", error);
        }
    }
}
