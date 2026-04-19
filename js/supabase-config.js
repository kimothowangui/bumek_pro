// js/supabase-config.js

const SUPABASE_URL = "https://aseaifstjavxifxshscn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzZWFpZnN0amF2eGlmeHNoc2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNDQ1NzUsImV4cCI6MjA4NjgyMDU3NX0.sqb8aJNI38UnJyUpyN2Luei4LsDK9-LpEBmcACyMnb0";

window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.BumekService = {
    // Products Service
    async fetchBumekProducts(category = 'All') {
        let query = window.supabaseClient.from("materials").select("*");
        if (category && category !== 'All') {
            query = query.eq("category", category);
        }
        const { data, error } = await query.order("name");
        if (error) {
            console.error("Error fetching products:", error);
            return [];
        }
        return data;
    },

    async fetchLimitedProducts(limit = 4) {
        const { data, error } = await window.supabaseClient.from("materials").select("*").limit(limit);
        if (error) {
            console.error("Error fetching limited products:", error);
            return [];
        }
        return data;
    },

    // Quotes Service
    async submitQuoteRequest(formData) {
        const { error } = await window.supabaseClient.from("quotes").insert([{
            client_name: formData.name,
            client_email: formData.email,
            client_phone: formData.phone,
            material_id: formData.material_id,
            quantity: parseFloat(formData.quantity) || 0,
            location: formData.location,
            status: 'PENDING'
        }]);
        if (error) {
            console.error("Error submitting quote:", error);
            return { success: false, error };
        }
        return { success: true };
    },

    // Admin Services
    async fetchStats() {
        const fetchCount = async (tableName, matchObj = {}) => {
            let query = window.supabaseClient.from(tableName).select("*", { count: 'exact', head: true });
            for (const key in matchObj) {
                query = query.eq(key, matchObj[key]);
            }
            const { count } = await query;
            return count || 0;
        };

        const mCount = await fetchCount("materials");
        const qCount = await fetchCount("quotes");
        const pCount = await fetchCount("quotes", { status: 'PENDING' });
        const dCount = await fetchCount("quotes", { status: 'DELIVERED' });

        return {
            materials: mCount,
            quotes: qCount,
            pending: pCount,
            delivered: dCount
        };
    },

    async fetchAdminQuotes(filter = 'ALL') {
        let query = window.supabaseClient.from("quotes").select(`*, materials(name, unit)`).order("created_at", { ascending: false });
        if (filter !== "ALL") {
            query = query.eq("status", filter);
        }
        const { data, error } = await query;
        if (error) {
            console.error("Error fetching quotes:", error);
            return [];
        }
        return data;
    },

    async updateQuoteStatus(id, newStatus) {
        const { error } = await window.supabaseClient.from("quotes").update({ status: newStatus }).eq("id", id);
        return !error;
    }
};
