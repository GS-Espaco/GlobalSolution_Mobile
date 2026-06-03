const API_URL = "http://192.168.0.3:3000";

export async function loginRequest(
    email: string,
    password: string
) {
    const response = await fetch(
        `${API_URL}/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }
    );

    return response.json();
}