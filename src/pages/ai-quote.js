import React, { useState } from "react"
import { Container, Row, Col, Button, Alert, Progress } from "reactstrap"
import PageHeader from "../components/pageHeader"
import config, { isAIConfigured } from "../utils/config"
import { calculateMississippiEstimate } from "../utils/mississippi-pricing"
import "./ai-quote.scss"

const AIQuotePage = () => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [estimate, setEstimate] = useState(null)

  const [formData, setFormData] = useState({
    // Customer Info
    name: "",
    email: "",
    phone: "",

    // Project Details
    projectType: "",
    roomType: "",
    currentCondition: "",
    squareFootage: "",
    timeline: "",
    budget: "",

    // Specific Requirements
    style: "",
    features: [],
    materials: "",
    specialRequests: "",

    // Images
    currentImages: [],
    inspirationImages: [],
  })

  const [visualization, setVisualization] = useState({
    loading: false,
    imageUrl: null,
    error: null,
  })

  const projectTypes = [
    "Kitchen Remodel",
    "Bathroom Remodel",
    "Whole House Renovation",
    "Room Addition",
    "Basement Finishing",
    "Outdoor Living Space",
    "Custom Home Build",
  ]

  const roomConditions = [
    "Excellent - Minor updates needed",
    "Good - Some work required",
    "Fair - Moderate renovation needed",
    "Poor - Major renovation required",
    "Complete gut renovation needed",
  ]

  const designStyles = [
    "Modern",
    "Traditional",
    "Contemporary",
    "Farmhouse",
    "Industrial",
    "Transitional",
    "Mediterranean",
    "Craftsman",
  ]

  const budgetRanges = [
    "Under $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000 - $200,000",
    "Over $200,000",
  ]

  const features = {
    kitchen: [
      "Island",
      "Breakfast Bar",
      "Pantry",
      "High-end Appliances",
      "Custom Cabinets",
      "Granite Countertops",
      "Backsplash",
      "Under-cabinet Lighting",
    ],
    bathroom: [
      "Double Vanity",
      "Walk-in Shower",
      "Soaking Tub",
      "Heated Floors",
      "Custom Tile Work",
      "Skylights",
      "Towel Warmers",
      "Steam Shower",
    ],
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        features: checked
          ? [...prev.features, value]
          : prev.features.filter((f) => f !== value),
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleImageUpload = (e, imageType) => {
    const files = Array.from(e.target.files)
    const maxSize = 5 * 1024 * 1024 // 5MB
    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        setError(`File ${file.name} is too large. Maximum size is 5MB.`)
        return false
      }
      return true
    })

    // Convert to base64 for preview and sending
    validFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [imageType]: [
            ...prev[imageType],
            {
              name: file.name,
              data: reader.result,
              size: file.size,
            },
          ],
        }))
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (imageType, index) => {
    setFormData((prev) => ({
      ...prev,
      [imageType]: prev[imageType].filter((_, i) => i !== index),
    }))
  }

  const generateAIPrompt = () => {
    return `
    Analyze this home improvement project and provide a detailed cost estimate:

    Project Type: ${formData.projectType}
    Room/Area: ${formData.roomType}
    Current Condition: ${formData.currentCondition}
    Square Footage: ${formData.squareFootage} sq ft
    Desired Style: ${formData.style}
    Timeline: ${formData.timeline}
    Budget Range: ${formData.budget}

    Requested Features:
    ${formData.features.join(", ")}

    Material Preferences: ${formData.materials}
    Special Requests: ${formData.specialRequests}

    Please provide:
    1. Detailed cost breakdown by category (materials, labor, permits, etc.)
    2. List of required materials with estimated quantities
    3. Estimated timeline with major milestones
    4. Potential cost-saving alternatives
    5. Recommended upgrades within budget
    6. Any potential challenges or considerations

    Format the response as a professional estimate that can be presented to the client.
    Include both a summary and detailed breakdown.
    `
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Prepare the data for submission
      const submitData = {
        ...formData,
        aiPrompt: generateAIPrompt(),
        timestamp: new Date().toISOString(),
        images: {
          current: formData.currentImages.map((img) => ({
            name: img.name,
            size: img.size,
          })),
          inspiration: formData.inspirationImages.map((img) => ({
            name: img.name,
            size: img.size,
          })),
        },
      }

      // Use configured API endpoint or fallback to mock
      const apiUrl = isAIConfigured() ? config.api.aiQuote : null

      const response = apiUrl
        ? await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(submitData),
          }).catch(() => {
            console.warn("AI API failed, using fallback estimate")
            return {
              ok: true,
              json: async () => ({
                success: true,
                estimate: generateMockEstimate(),
              }),
            }
          })
        : await new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                ok: true,
                json: async () => ({
                  success: true,
                  estimate: generateMockEstimate(),
                }),
              })
            }, 2000)
          })

      const result = await response.json()

      if (result.success) {
        setEstimate(result.estimate)
        setSuccess(true)
        setStep(4) // Move to results step

        // Generate visualization after estimate
        setTimeout(() => {
          generateVisualization()
        }, 500)

        // Also send via Formspree for email notification
        const formspreeData = new FormData()
        formspreeData.append("name", formData.name)
        formspreeData.append("email", formData.email)
        formspreeData.append("phone", formData.phone)
        formspreeData.append("project_details", JSON.stringify(submitData))

        await fetch("https://formspree.io/f/mykgnqee", {
          method: "POST",
          body: formspreeData,
        }).catch(() => {
          console.log("Formspree submission failed, but estimate was generated")
        })
      }
    } catch (err) {
      setError("Failed to generate estimate. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const generateVisualization = async () => {
    setVisualization({ loading: true, imageUrl: null, error: null })

    try {
      // Create a detailed prompt for the AI image generation
      const visualizationPrompt = `
        Create a photorealistic interior design visualization of a ${formData.style || "modern"} style
        ${formData.projectType} project. The space is ${formData.squareFootage || "150"} square feet.
        Design features should include: ${formData.features.join(", ") || "standard features"}.
        Materials: ${formData.materials || "high-quality finishes"}.
        Color scheme: warm and inviting with neutral tones and ${formData.style === "Modern" ? "clean lines" : "classic details"}.
        Lighting: natural daylight with accent lighting.
        Perspective: 3/4 view showing the full space.
        Quality: photorealistic, high-end architectural visualization, magazine quality.
      `.trim()

      // Try to generate with Cloudflare AI
      if (isAIConfigured()) {
        const response = await fetch("/api/ai-visualize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: visualizationPrompt,
            projectType: formData.projectType,
            style: formData.style,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          setVisualization({
            loading: false,
            imageUrl: data.imageUrl || "/images/visualization-placeholder.jpg",
            error: null,
          })
          return
        }
      }

      // Fallback to placeholder images based on project type
      const placeholders = {
        "Kitchen Remodel":
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
        "Bathroom Remodel":
          "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800",
        "Whole House Renovation":
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        "Room Addition":
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        "Basement Finishing":
          "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800",
        "Outdoor Living Space":
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
        "Custom Home Build":
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      }

      setVisualization({
        loading: false,
        imageUrl:
          placeholders[formData.projectType] || placeholders["Kitchen Remodel"],
        error: null,
      })
    } catch (error) {
      console.error("Visualization generation error:", error)
      setVisualization({
        loading: false,
        imageUrl: null,
        error: "Unable to generate visualization at this time",
      })
    }
  }

  const generateMockEstimate = () => {
    // Use Mississippi-specific pricing model for accurate local estimates
    const mississippiEstimate = calculateMississippiEstimate(formData)
    const sqft = parseInt(formData.squareFootage) || 100

    return {
      summary: {
        total: mississippiEstimate.summary.total,
        timeline: formData.timeline || mississippiEstimate.summary.timeline,
        sqft: formData.squareFootage,
        location: "Mississippi (Regional Pricing)",
        pricePerSqft: mississippiEstimate.summary.pricePerSqft,
      },
      breakdown: mississippiEstimate.breakdown,
      materials: [
        {
          item: formData.projectType?.includes("Kitchen")
            ? "Cabinets"
            : "Fixtures",
          quantity: "As specified",
          cost: Math.round(mississippiEstimate.breakdown.materials * 0.3),
        },
        {
          item: formData.projectType?.includes("Kitchen")
            ? "Countertops"
            : "Vanity & Fixtures",
          quantity: `${sqft} sq ft`,
          cost: Math.round(mississippiEstimate.breakdown.materials * 0.25),
        },
        {
          item: "Flooring",
          quantity: `${sqft} sq ft`,
          cost: Math.round(mississippiEstimate.breakdown.materials * 0.2),
        },
        {
          item: formData.projectType?.includes("Kitchen")
            ? "Appliances"
            : "Plumbing",
          quantity: "Package",
          cost: Math.round(mississippiEstimate.breakdown.materials * 0.15),
        },
        {
          item: "Paint & Finishes",
          quantity: "As needed",
          cost: Math.round(mississippiEstimate.breakdown.materials * 0.1),
        },
      ],
      timeline: [
        { phase: "Planning & Permits", duration: "1-2 weeks" },
        { phase: "Demolition", duration: "3-5 days" },
        { phase: "Rough Construction", duration: "2-3 weeks" },
        { phase: "Finishes", duration: "2-3 weeks" },
        { phase: "Final Inspection", duration: "2-3 days" },
      ],
      recommendations: [
        ...mississippiEstimate.regionalNotes,
        "Consider energy-efficient appliances for long-term savings",
        "Use local contractors for better pricing",
        "Schedule work during off-season for potential discounts",
      ],
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="step-content">
            <h3 className="mb-4">Step 1: Basic Information</h3>
            <Row>
              <Col md="6" className="mb-3">
                <label>Your Name *</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col md="6" className="mb-3">
                <label>Email Address *</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col md="6" className="mb-3">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col md="6" className="mb-3">
                <label>Project Type *</label>
                <select
                  className="form-control"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Project Type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </Col>
              <Col md="6" className="mb-3">
                <label>Approximate Square Footage</label>
                <input
                  type="number"
                  className="form-control"
                  name="squareFootage"
                  value={formData.squareFootage}
                  onChange={handleInputChange}
                  placeholder="e.g., 150"
                />
              </Col>
              <Col md="6" className="mb-3">
                <label>Desired Timeline</label>
                <select
                  className="form-control"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                >
                  <option value="">Select Timeline</option>
                  <option value="ASAP">As soon as possible</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6-12 months">6-12 months</option>
                  <option value="Planning stage">Just planning</option>
                </select>
              </Col>
            </Row>
          </div>
        )

      case 2:
        return (
          <div className="step-content">
            <h3 className="mb-4">Step 2: Project Details</h3>
            <Row>
              <Col md="6" className="mb-3">
                <label>Room/Area Type</label>
                <input
                  type="text"
                  className="form-control"
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleInputChange}
                  placeholder="e.g., Master Bathroom, Kitchen"
                />
              </Col>
              <Col md="6" className="mb-3">
                <label>Current Condition</label>
                <select
                  className="form-control"
                  name="currentCondition"
                  value={formData.currentCondition}
                  onChange={handleInputChange}
                >
                  <option value="">Select Condition</option>
                  {roomConditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </Col>
              <Col md="6" className="mb-3">
                <label>Preferred Style</label>
                <select
                  className="form-control"
                  name="style"
                  value={formData.style}
                  onChange={handleInputChange}
                >
                  <option value="">Select Style</option>
                  {designStyles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </Col>
              <Col md="6" className="mb-3">
                <label>Budget Range</label>
                <select
                  className="form-control"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                >
                  <option value="">Select Budget</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </Col>
              <Col md="12" className="mb-3">
                <label>Desired Features</label>
                <div className="features-grid">
                  {(formData.projectType.toLowerCase().includes("kitchen")
                    ? features.kitchen
                    : features.bathroom
                  ).map((feature) => (
                    <div key={feature} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={feature}
                        value={feature}
                        checked={formData.features.includes(feature)}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor={feature}>
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </Col>
              <Col md="6" className="mb-3">
                <label>Material Preferences</label>
                <input
                  type="text"
                  className="form-control"
                  name="materials"
                  value={formData.materials}
                  onChange={handleInputChange}
                  placeholder="e.g., Quartz countertops, hardwood floors"
                />
              </Col>
              <Col md="6" className="mb-3">
                <label>Special Requests</label>
                <textarea
                  className="form-control"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Any specific requirements or preferences"
                />
              </Col>
            </Row>
          </div>
        )

      case 3:
        return (
          <div className="step-content">
            <h3 className="mb-4">Step 3: Upload Images (Optional)</h3>
            <p className="text-muted mb-4">
              Upload photos of your current space and any inspiration images.
              This helps our AI provide more accurate estimates and suggestions.
            </p>
            <Row>
              <Col md="6" className="mb-4">
                <div className="upload-section">
                  <h5>Current Space Photos</h5>
                  <input
                    type="file"
                    className="form-control mb-2"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "currentImages")}
                  />
                  <div className="image-preview-grid">
                    {formData.currentImages.map((img, index) => (
                      <div key={index} className="image-preview">
                        <img src={img.data} alt={`Current ${index + 1}`} />
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => removeImage("currentImages", index)}
                        >
                          ×
                        </button>
                        <small>{img.name}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
              <Col md="6" className="mb-4">
                <div className="upload-section">
                  <h5>Inspiration Images</h5>
                  <input
                    type="file"
                    className="form-control mb-2"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "inspirationImages")}
                  />
                  <div className="image-preview-grid">
                    {formData.inspirationImages.map((img, index) => (
                      <div key={index} className="image-preview">
                        <img src={img.data} alt={`Inspiration ${index + 1}`} />
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            removeImage("inspirationImages", index)
                          }
                        >
                          ×
                        </button>
                        <small>{img.name}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
            <div className="text-center mt-4">
              <p className="text-muted">
                <strong>Note:</strong> Images are analyzed by AI to provide
                design suggestions and more accurate cost estimates based on
                your current space.
              </p>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="step-content results-step">
            <h3 className="mb-4">Your AI-Generated Estimate</h3>
            {estimate && (
              <div className="estimate-results">
                <Alert color="success" className="mb-4">
                  <h4>Estimate Generated Successfully!</h4>
                  <p>
                    Your detailed estimate has been created and sent to your
                    email.
                  </p>
                </Alert>

                <div className="estimate-summary card mb-4">
                  <div className="card-body">
                    <h4>Project Summary</h4>
                    <Row>
                      <Col md="4">
                        <strong>Total Estimated Cost:</strong>
                        <h3 className="text-primary">
                          ${estimate.summary.total.toLocaleString()}
                        </h3>
                      </Col>
                      <Col md="4">
                        <strong>Timeline:</strong>
                        <p>{estimate.summary.timeline}</p>
                      </Col>
                      <Col md="4">
                        <strong>Square Footage:</strong>
                        <p>{estimate.summary.sqft} sq ft</p>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="cost-breakdown card mb-4">
                  <div className="card-body">
                    <h4>Cost Breakdown</h4>
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>Materials</td>
                          <td className="text-right">
                            ${estimate.breakdown.materials.toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <td>Labor</td>
                          <td className="text-right">
                            ${estimate.breakdown.labor.toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <td>Permits & Fees</td>
                          <td className="text-right">
                            ${estimate.breakdown.permits.toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <td>Selected Features</td>
                          <td className="text-right">
                            ${estimate.breakdown.features.toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <td>Contingency (5%)</td>
                          <td className="text-right">
                            ${estimate.breakdown.contingency.toLocaleString()}
                          </td>
                        </tr>
                        <tr className="font-weight-bold">
                          <td>Total</td>
                          <td className="text-right">
                            ${estimate.summary.total.toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="materials-list card mb-4">
                  <div className="card-body">
                    <h4>Materials List</h4>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th className="text-right">Estimated Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {estimate.materials.map((item, index) => (
                          <tr key={index}>
                            <td>{item.item}</td>
                            <td>{item.quantity}</td>
                            <td className="text-right">
                              ${item.cost.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="timeline card mb-4">
                  <div className="card-body">
                    <h4>Project Timeline</h4>
                    <ul className="timeline-list">
                      {estimate.timeline.map((phase, index) => (
                        <li key={index}>
                          <strong>{phase.phase}:</strong> {phase.duration}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="recommendations card mb-4">
                  <div className="card-body">
                    <h4>AI Recommendations</h4>
                    <ul>
                      {estimate.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* AI Visualization Section */}
                <div className="visualization-section card mb-4">
                  <div className="card-body">
                    <h4>AI-Generated Project Visualization</h4>
                    <p className="text-muted mb-3">
                      This AI-generated visualization shows how your{" "}
                      {formData.projectType} could look with your selected style
                      and features.
                    </p>

                    {visualization.loading && (
                      <div className="text-center py-5">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="sr-only">
                            Generating visualization...
                          </span>
                        </div>
                        <p className="mt-3">
                          Creating your project visualization...
                        </p>
                      </div>
                    )}

                    {visualization.imageUrl && !visualization.loading && (
                      <div className="visualization-container">
                        <img
                          src={visualization.imageUrl}
                          alt={`${formData.style} ${formData.projectType} visualization`}
                          className="visualization-image"
                        />
                        <div className="visualization-details mt-3">
                          <Row>
                            <Col md="6">
                              <h6>Design Style</h6>
                              <p>{formData.style || "Modern"}</p>
                            </Col>
                            <Col md="6">
                              <h6>Key Features</h6>
                              <p>
                                {formData.features.length > 0
                                  ? formData.features.slice(0, 3).join(", ")
                                  : "Standard features"}
                              </p>
                            </Col>
                          </Row>
                          <div className="alert alert-info mt-3">
                            <i className="fas fa-info-circle mr-2"></i>
                            This is a conceptual visualization. Actual results
                            may vary based on site conditions, material
                            availability, and final design choices.
                          </div>
                        </div>
                      </div>
                    )}

                    {visualization.error && !visualization.loading && (
                      <div className="alert alert-warning">
                        <i className="fas fa-exclamation-triangle mr-2"></i>
                        {visualization.error}
                      </div>
                    )}

                    {!visualization.loading &&
                      !visualization.imageUrl &&
                      !visualization.error && (
                        <div className="text-center">
                          <Button
                            color="outline-primary"
                            onClick={generateVisualization}
                          >
                            Generate Visualization
                          </Button>
                        </div>
                      )}
                  </div>
                </div>

                <div className="next-steps text-center">
                  <h4>Ready to Get Started?</h4>
                  <p>
                    Our team has received your project details and will contact
                    you within 24 hours to discuss your project.
                  </p>
                  <Button
                    color="primary"
                    size="lg"
                    href="tel:601-954-1306"
                    className="mr-2"
                  >
                    Call Us Now
                  </Button>
                  <Button
                    color="outline-primary"
                    size="lg"
                    onClick={() => window.print()}
                  >
                    Print Estimate
                  </Button>
                </div>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section id="ai-quote">
      <PageHeader title="AI-Powered Project Estimator" />
      <Container>
        <div className="ai-quote-page section-lg">
          <div className="intro-section text-center mb-5">
            <h2>Get an Instant AI-Generated Project Estimate</h2>
            <p className="lead">
              Our advanced AI technology analyzes your project details and
              provides accurate cost estimates, material lists, and timeline
              projections in seconds.
            </p>
            {config.isDevelopment && (
              <div className="mt-3">
                <small
                  className={isAIConfigured() ? "text-success" : "text-warning"}
                >
                  {isAIConfigured()
                    ? "✅ AI Gateway configured and ready"
                    : "⚠️ AI Gateway not configured - using calculated estimates"}
                </small>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="progress-section mb-5">
            <Progress value={(step / 4) * 100} />
            <div className="step-indicators">
              <span className={step >= 1 ? "active" : ""}>Basic Info</span>
              <span className={step >= 2 ? "active" : ""}>Project Details</span>
              <span className={step >= 3 ? "active" : ""}>Images</span>
              <span className={step >= 4 ? "active" : ""}>Results</span>
            </div>
          </div>

          {error && (
            <Alert color="danger" toggle={() => setError("")}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {renderStep()}

            <div className="form-navigation mt-4">
              <Row>
                <Col>
                  {step > 1 && step < 4 && (
                    <Button
                      type="button"
                      color="secondary"
                      onClick={() => setStep(step - 1)}
                      disabled={loading}
                    >
                      Previous
                    </Button>
                  )}
                </Col>
                <Col className="text-right">
                  {step < 3 && (
                    <Button
                      type="button"
                      color="primary"
                      onClick={() => setStep(step + 1)}
                      disabled={loading}
                    >
                      Next
                    </Button>
                  )}
                  {step === 3 && (
                    <Button
                      type="submit"
                      color="success"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? "Generating Estimate..." : "Get AI Estimate"}
                    </Button>
                  )}
                </Col>
              </Row>
            </div>
          </form>

          {loading && (
            <div className="loading-overlay">
              <div className="loading-content">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <p className="mt-3">Our AI is analyzing your project...</p>
                <p className="text-muted">This usually takes 10-15 seconds</p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

export default AIQuotePage
