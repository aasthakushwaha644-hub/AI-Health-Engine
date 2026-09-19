/**
 * Search/filter symptoms based on search input
 */
function searchSymptoms() {
    const searchInput = document.getElementById("search");
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase().trim();
    const symptomElements = document.querySelectorAll(".symptom");

    symptomElements.forEach(function (element) {
        const textElement = element.querySelector("span");
        const text = textElement ? textElement.textContent.toLowerCase() : "";

        element.style.display = text.includes(query) ? "flex" : "none";
    });
}

/**
 * Clear search input and reset symptom filter
 */
function clearSearch() {
    const searchInput = document.getElementById("search");
    if (!searchInput) return;

    searchInput.value = "";
    searchSymptoms();
}

/**
 * Update active checkbox counter badge/label
 */
function updateCounter() {
    const selected = document.querySelectorAll('.symptom input[type="checkbox"]:checked');
    const counter = document.getElementById("counter");

    if (!counter) return;

    counter.textContent = `${selected.length} selected`;

    if (selected.length > 0) {
        counter.classList.add("active");
    } else {
        counter.classList.remove("active");
    }
}

/**
 * Reset all checkboxes, search inputs, and results
 */
function clearSymptoms() {
    const checkboxes = document.querySelectorAll('.symptom input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
    });

    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.value = "";
    }

    searchSymptoms();
    updateCounter();

    const result = document.getElementById("result");
    if (result) {
        result.innerHTML = "";
        result.classList.add("hidden");
    }

    const printSection = document.getElementById("printSection");
    if (printSection) {
        printSection.classList.add("hidden");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/**
 * Escape HTML to prevent XSS vulnerability
 */
function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text == null ? "" : String(text);
    return div.innerHTML;
}

/**
 * Format snake_case text to Title Case
 */
function formatText(text) {
    if (!text) return "";

    return String(text)
        .replace(/_/g, " ")
        .replace(/\b\w/g, function (char) {
            return char.toUpperCase();
        });
}

/**
 * Render general list items
 */
function createList(items) {
    if (!items || items.length === 0) {
        return `<p class="empty-message">No information available.</p>`;
    }

    let html = '<ul class="info-list">';
    items.forEach(function (item) {
        html += `<li>${escapeHTML(item)}</li>`;
    });
    html += "</ul>";

    return html;
}

/**
 * Render selected symptom tags
 */
function createSymptomsList(symptoms) {
    if (!symptoms || symptoms.length === 0) {
        return `<p class="empty-message">No symptoms selected.</p>`;
    }

    let html = '<div class="selected-symptoms">';
    symptoms.forEach(function (symptom) {
        html += `<span class="symptom-tag">${escapeHTML(formatText(symptom))}</span>`;
    });
    html += "</div>";

    return html;
}

/**
 * Get static explanation mapping for predicted conditions
 */
function getConditionExplanation(condition) {
    const explanations = {
        "Fungal infection": {
            what: "A fungal infection is an infection caused by fungi that can affect the skin or other parts of the body.",
            points: [
                "It may be associated with itching or skin irritation.",
                "Skin changes such as rashes may occur.",
                "Some selected symptoms can overlap with patterns seen in fungal infections.",
                "The model found similarities between the entered symptoms and this condition."
            ]
        },
        "Drug Reaction": {
            what: "A drug reaction can happen when the body responds to a medicine or another substance.",
            points: [
                "It can sometimes cause itching or skin rashes.",
                "Symptoms can vary depending on the medicine or substance involved.",
                "The selected symptoms may overlap with patterns seen in drug reactions.",
                "The model identified this condition as one of the stronger matches."
            ]
        },
        "GERD": {
            what: "GERD is a digestive condition where stomach contents can flow back toward the food pipe.",
            points: [
                "Heartburn or burning discomfort may occur.",
                "Some people may notice a sour or acidic taste.",
                "Digestive symptoms can overlap with the symptoms entered.",
                "The model found similarities with patterns associated with GERD."
            ]
        },
        "Common Cold": {
            what: "The common cold is a usually mild respiratory illness caused by different viruses.",
            points: [
                "It commonly affects the nose or throat.",
                "Coughing or sneezing may occur.",
                "Tiredness or mild body discomfort can sometimes occur.",
                "The model found overlap between the entered symptoms and its training patterns."
            ]
        },
        "Flu": {
            what: "Flu is a viral respiratory illness that can cause respiratory and general body symptoms.",
            points: [
                "Fever and tiredness can occur.",
                "Cough or throat-related symptoms may be present.",
                "Body aches may occur in some people.",
                "The model found similarities between the selected symptoms and flu-related patterns."
            ]
        },
        "Migraine": {
            what: "Migraine is a neurological condition that can cause recurring headache episodes and other symptoms.",
            points: [
                "Headache is a common feature.",
                "Nausea or vomiting can occur.",
                "Some people experience sensitivity to light or sound.",
                "The model found overlap with patterns associated with migraine."
            ]
        },
        "Gastritis": {
            what: "Gastritis refers to irritation or inflammation of the stomach lining.",
            points: [
                "It may cause stomach discomfort or pain.",
                "Nausea or vomiting can sometimes occur.",
                "Digestive symptoms may overlap with the symptoms entered.",
                "The model identified gastritis as one of the possible matches."
            ]
        },
        "Hepatitis D": {
            what: "Hepatitis D is a liver infection caused by the hepatitis D virus and occurs with hepatitis B infection.",
            points: [
                "Tiredness or weakness can occur.",
                "Nausea or vomiting may be present.",
                "Loss of appetite can occur in some cases.",
                "The model found overlap between the selected symptoms and its training patterns."
            ]
        },
        "Allergy": {
            what: "An allergy occurs when the immune system reacts to a substance that is normally harmless.",
            points: [
                "Sneezing or itching may occur.",
                "Skin irritation or rashes can sometimes appear.",
                "Symptoms can vary depending on the trigger.",
                "The model found similarities between the entered symptoms and allergy-related patterns."
            ]
        },
        "Pneumonia": {
            what: "Pneumonia is an infection or inflammation affecting the lungs.",
            points: [
                "Cough and fever may occur.",
                "Breathing-related symptoms can sometimes be present.",
                "Tiredness may accompany the illness.",
                "The model found some overlap with pneumonia-related patterns."
            ]
        },
        "Bronchial Asthma": {
            what: "Bronchial asthma is a condition involving inflammation and narrowing of the airways.",
            points: [
                "Breathing difficulty may occur.",
                "Wheezing can be present.",
                "Coughing may occur in some situations.",
                "The model found similarities with asthma-related symptom patterns."
            ]
        }
    };

    if (explanations[condition]) {
        return explanations[condition];
    }

    return {
        what: `${condition} is a condition represented in the machine-learning dataset used by this application.`,
        points: [
            "The selected symptoms have some overlap with patterns associated with this condition.",
            "The model considered this condition while comparing the entered symptoms.",
            "Its position reflects the model's relative output for the selected symptoms.",
            "This result does not confirm that the person has this condition."
        ]
    };
}

/**
 * Render Top 3 Predictions
 */
function createTopPredictionsList(predictions) {
    if (!predictions || predictions.length === 0) {
        return `<p class="empty-message">No model matches available.</p>`;
    }

    let html = "";

    predictions.slice(0, 3).forEach(function (item, index) {
        const numericScore = Number(item.score);
        const score = Math.max(
            0,
            Math.min(100, Number.isFinite(numericScore) ? numericScore : 0)
        );

        const explanation = getConditionExplanation(item.condition);

        html += `
            <div class="prediction-item">
                <div class="prediction-title">
                    <span class="prediction-number">${index + 1}</span>
                    <div class="prediction-name-box">
                        <strong>${escapeHTML(item.condition)}</strong>
                        <span class="prediction-score">${score.toFixed(2)}% Model Match</span>
                    </div>
                </div>

                <div class="progress-bar">
                    <div class="progress-fill" style="width:${score}%"></div>
                </div>

                <div class="condition-explanation">
                    <div class="explanation-title">What does this mean?</div>
                    <p class="condition-what">${escapeHTML(explanation.what)}</p>

                    <div class="explanation-title small-explanation-title">Why it appears in the results</div>
                    <ul class="condition-points">
                        ${explanation.points
                            .map((point) => `<li>${escapeHTML(point)}</li>`)
                            .join("")}
                    </ul>
                </div>
            </div>
        `;
    });

    return html;
}

/**
 * Render feature contributions explaining why result was chosen
 */
function createExplanationList(items) {
    if (!items || items.length === 0) {
        return `<p class="card-intro">No feature contribution information is available.</p>`;
    }

    let html = '<div class="explanation-list">';
    items.forEach(function (item) {
        html += `
            <div class="explanation-row">
                <strong>${escapeHTML(item.symptom)}</strong>
                <span class="contribution">${escapeHTML(item.contribution)}</span>
            </div>
        `;
    });
    html += "</div>";

    return html;
}

/**
 * Render food suggestions grid
 */
function createFoodList(items) {
    if (!items || items.length === 0) {
        return `<p class="empty-message">No food information available.</p>`;
    }

    let html = '<div class="food-grid">';
    items.forEach(function (item) {
        html += `
            <div class="food-item">
                <strong>${escapeHTML(item.name)}</strong>
                <p>${escapeHTML(item.explanation)}</p>
            </div>
        `;
    });
    html += "</div>";

    return html;
}

function getAttentionClass(tone) {
    if (tone === "urgent") return "urgent";
    if (tone === "high") return "high";
    if (tone === "moderate") return "moderate";
    return "low";
}

/**
 * Render Attention Level Card
 */
function createAttentionCard(data) {
    const tone = data.attention_tone || data.risk_tone || "low";
    const attentionClass = getAttentionClass(tone);
    const level = data.attention_level || data.risk_level || "General monitoring";
    const label = data.attention_label || data.risk_label || "Monitor your symptoms";
    const description =
        data.attention_description ||
        data.risk_description ||
        "Monitor your symptoms and consider professional advice if needed.";

    return `
        <div class="result-card">
            <h2>Health Attention Level</h2>
            <p class="card-intro">An app-level assessment based on the selected symptoms and model output.</p>

            <div class="risk-card ${attentionClass}">
                <strong>${escapeHTML(level)}</strong>
                <span>${escapeHTML(label)}</span>
                <p>${escapeHTML(description)}</p>
            </div>

            <p class="card-intro small-note">
                This is not a medical diagnosis. The attention level is a feature of this educational application.
            </p>
        </div>
    `;
}

/**
 * Render Warning/Emergency banner if needed
 */
function createEmergencyCard(data) {
    if (!data.emergency) return "";

    const emergencySymptoms = data.emergency_symptoms || [];
    let symptoms = "";

    emergencySymptoms.forEach(function (symptom) {
        symptoms += `<li>${escapeHTML(symptom)}</li>`;
    });

    return `
        <div class="emergency-card">
            <h2>Important Warning</h2>
            <p>Some selected symptoms may require prompt medical evaluation.</p>
            ${emergencySymptoms.length > 0 ? `<ul>${symptoms}</ul>` : ""}
            <p class="emergency-note">
                Please seek appropriate medical care, especially if symptoms are severe or rapidly worsening.
            </p>
        </div>
    `;
}

/**
 * Render Medical Help section with Google Maps integration
 */
function createNearbyDoctorSection(data) {
    const specialty = data.recommended_specialty || "General Physician";

    return `
        <section class="nearby-section">
            <div class="nearby-content">
                <div class="nearby-text">
                    <span class="nearby-label">Medical Help</span>
                    <h2>Find Nearby Medical Help</h2>
                    <p>
                        Based on your selected symptoms and model result, you may consider consulting a
                        <strong class="specialty-name">${escapeHTML(specialty)}</strong>.
                    </p>
                    <p class="nearby-note">Choose either option below to find healthcare services near your location.</p>
                </div>

                <div class="nearby-actions">
                    <button type="button" class="location-btn" onclick="findNearbyDoctors()">Use My Location</button>
                    <button type="button" class="area-btn" onclick="searchByArea()">Search by Area</button>
                </div>
            </div>

            <div id="areaSearchBox" class="area-search-box hidden">
                <div class="area-input-wrapper">
                    <input 
                        type="text" 
                        id="areaInput" 
                        placeholder="Enter your city or area" 
                        autocomplete="off" 
                        onkeydown="if (event.key === 'Enter') { event.preventDefault(); openAreaSearch(); }"
                    >
                    <button type="button" class="area-search-btn" onclick="openAreaSearch()">Search Nearby</button>
                </div>
            </div>

            <div id="locationStatus" class="location-status"></div>

            <div class="nearby-disclaimer">
                Nearby healthcare options are shown based on specialty and location. They are not endorsements and do not confirm that a particular doctor is appropriate for your condition.
            </div>
        </section>
    `;
}

function getDisplayedSpecialty() {
    const element = document.querySelector(".specialty-name");
    return element ? element.textContent.trim() : "General Physician";
}

function searchByArea() {
    const areaBox = document.getElementById("areaSearchBox");
    if (!areaBox) return;

    areaBox.classList.toggle("hidden");

    if (!areaBox.classList.contains("hidden")) {
        const input = document.getElementById("areaInput");
        if (input) input.focus();
    }
}

function openAreaSearch() {
    const input = document.getElementById("areaInput");
    const status = document.getElementById("locationStatus");

    if (!input || !status) return;

    const area = input.value.trim();

    if (!area) {
        status.innerHTML = "Please enter your city or area.";
        status.className = "location-status error";
        input.focus();
        return;
    }

    const specialty = getDisplayedSpecialty();
    const query = encodeURIComponent(`${specialty} near ${area}`);
    const mapsUrl = `https://www.google.com/maps/search/${query}`;

    status.innerHTML = "Opening nearby healthcare options...";
    status.className = "location-status success";

    const areaBox = document.getElementById("areaSearchBox");
    if (areaBox) areaBox.classList.add("hidden");

    const newWindow = window.open(mapsUrl, "_blank");
    if (!newWindow) {
        status.innerHTML = "Your browser blocked the Maps window. Please allow pop-ups and try again.";
        status.className = "location-status error";
    }
}

function findNearbyDoctors() {
    const status = document.getElementById("locationStatus");
    if (!status) return;

    if (!navigator.geolocation) {
        status.innerHTML = "Location services are not supported by this browser.";
        status.className = "location-status error";
        return;
    }

    status.innerHTML = "Requesting your location...";
    status.className = "location-status loading";

    navigator.geolocation.getCurrentPosition(
        function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const specialty = getDisplayedSpecialty();

            const query = encodeURIComponent(`${specialty} near me`);
            const mapsUrl = `https://www.google.com/maps/search/${query}/@${latitude},${longitude},14z`;

            status.innerHTML = "Location found. Opening nearby healthcare options...";
            status.className = "location-status success";

            const newWindow = window.open(mapsUrl, "_blank");
            if (!newWindow) {
                status.innerHTML = "Your browser blocked the Maps window. Please allow pop-ups and try again.";
                status.className = "location-status error";
            }
        },
        function (error) {
            if (error.code === 1) {
                status.innerHTML = "Location permission was denied. Please allow location access or use Search by Area.";
            } else if (error.code === 2) {
                status.innerHTML = "Your location could not be detected. Please try again or use Search by Area.";
            } else if (error.code === 3) {
                status.innerHTML = "Location request timed out. Please try again.";
            } else {
                status.innerHTML = "Unable to detect your location. Please use Search by Area.";
            }
            status.className = "location-status error";
        },
        {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000
        }
    );
}

function printReport() {
    window.print();
}

/**
 * Main function to trigger API prediction and render output
 */
async function predictDisease() {
    const selected = document.querySelectorAll('.symptom input[type="checkbox"]:checked');
    const selectedSymptoms = [];

    selected.forEach(function (checkbox) {
        selectedSymptoms.push(checkbox.value);
    });

    if (selectedSymptoms.length === 0) {
        alert("Please select at least one symptom.");
        return;
    }

    const button = document.querySelector(".predict-btn");
    const result = document.getElementById("result");

    if (button) {
        button.disabled = true;
        button.textContent = "Analyzing...";
    }

    if (result) {
        result.classList.remove("hidden");
        result.innerHTML = `
            <div class="result-card loading-card">
                <h2>Analyzing Symptoms</h2>
                <p class="card-intro">The machine-learning model is processing your selected symptoms...</p>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
            </div>
        `;
    }

    try {
        const response = await fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ symptoms: selectedSymptoms })
        });

        let data;
        try {
            data = await response.json();
        } catch (jsonError) {
            throw new Error("The server returned an invalid response.");
        }

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong.");
        }

        if (!data.prediction) {
            throw new Error("No prediction was returned by the model.");
        }

        const topPredictions = Array.isArray(data.top_predictions) ? data.top_predictions : [];
        const firstScore = topPredictions.length > 0 ? Number(topPredictions[0].score) || 0 : 0;

        let html = `
            <div class="main-result">
                <span class="result-label">POSSIBLE CONDITION</span>
                <div class="result-main-row">
                    <div class="result-condition">
                        <div class="condition-icon">🩺</div>
                        <div>
                            <h2>${escapeHTML(data.prediction)}</h2>
                            <p>Based on the symptoms you selected.</p>
                        </div>
                    </div>
                    <div class="match-box">
                        <span>Model Match</span>
                        <strong>${firstScore.toFixed(2)}%</strong>
                    </div>
                </div>
            </div>

            <div class="result-grid">
                <div class="result-card">
                    <h2>Top 3 Model Matches</h2>
                    <p class="card-intro">These are the three conditions with the highest relative model scores for the selected symptoms.</p>
                    ${createTopPredictionsList(topPredictions)}
                </div>

                ${createAttentionCard(data)}

                <div class="result-card">
                    <h2>Why This Result?</h2>
                    <p class="card-intro">These selected symptoms have stronger contributions among the model features considered for this result.</p>
                    ${createExplanationList(data.why_result)}
                </div>

                <div class="result-card">
                    <h2>Selected Symptoms</h2>
                    <p class="card-intro">Symptoms used by the model for this assessment.</p>
                    ${createSymptomsList(data.symptoms_used)}
                </div>
            </div>

            ${createEmergencyCard(data)}
            ${createNearbyDoctorSection(data)}

            <div class="result-card full-width">
                <h2>General Guidance</h2>
                <p class="card-intro">General suggestions related to the model result.</p>
                ${createList(data.advice)}
            </div>

            <div class="result-card full-width">
                <h2>Diet Guidance</h2>
                <p class="card-intro">General dietary considerations related to the selected result.</p>
                ${createList(data.diet)}
            </div>

            <div class="result-card full-width">
                <h2>Suggested Foods & Why</h2>
                <p class="card-intro">These foods are suggested as general nutritious options. They are not a treatment for the predicted condition.</p>
                ${createFoodList(data.food_explanations)}
            </div>

            <div class="result-card full-width">
                <h2>When to Consult a Professional</h2>
                <p class="card-intro">Consider professional evaluation when symptoms persist, worsen or require medical assessment.</p>
                ${createList(data.doctor)}
            </div>

            <div class="result-card full-width">
                <h2>About This Result</h2>
                <p class="card-intro">${escapeHTML(data.disclaimer)}</p>
            </div>
        `;

        if (result) {
            result.innerHTML = html;
        }

        const printSection = document.getElementById("printSection");
        if (printSection) {
            printSection.classList.remove("hidden");
        }

        setTimeout(function () {
            if (result) {
                result.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }, 150);

    } catch (error) {
        if (result) {
            result.innerHTML = `
                <div class="emergency-card">
                    <h2>Error</h2>
                    <p>${escapeHTML(error.message)}</p>
                </div>
            `;
        }

        const printSection = document.getElementById("printSection");
        if (printSection) {
            printSection.classList.add("hidden");
        }
    } finally {
        if (button) {
            button.disabled = false;
            button.textContent = "Analyze Symptoms";
        }
    }
}

/**
 * Global Event Listeners setup
 */
document.addEventListener("DOMContentLoaded", function () {
    updateCounter();
    searchSymptoms();

    const checkboxes = document.querySelectorAll('.symptom input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", updateCounter);
    });

    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.addEventListener("input", searchSymptoms);
    }
});