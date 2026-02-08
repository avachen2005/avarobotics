import XCTest
import SwiftUI
@testable import AvaRobotics

final class GradientTokenTests: XCTestCase {

    // MARK: - Helper

    private func hexString(from color: Color) -> String {
        let uiColor = UIColor(color)
        var r: CGFloat = 0, g: CGFloat = 0, b: CGFloat = 0, a: CGFloat = 0
        uiColor.getRed(&r, green: &g, blue: &b, alpha: &a)
        return String(
            format: "#%02x%02x%02x",
            Int(round(r * 255)),
            Int(round(g * 255)),
            Int(round(b * 255))
        )
    }

    // MARK: - Primary Gradient

    func testPrimaryGradientStops() {
        let stops = GradientToken.primaryStops
        XCTAssertEqual(stops.count, 3)
        XCTAssertEqual(hexString(from: stops[0]), "#8b5cf6")
        XCTAssertEqual(hexString(from: stops[1]), "#6d28d9")
        XCTAssertEqual(hexString(from: stops[2]), "#5b21b6")
    }

    // MARK: - Accent Gradient

    func testAccentGradientStops() {
        let stops = GradientToken.accentStops
        XCTAssertEqual(stops.count, 3)
        XCTAssertEqual(hexString(from: stops[0]), "#e879f9")
        XCTAssertEqual(hexString(from: stops[1]), "#d946ef")
        XCTAssertEqual(hexString(from: stops[2]), "#c026d3")
    }

    // MARK: - Secondary Gradient

    func testSecondaryGradientStops() {
        let stops = GradientToken.secondaryStops
        XCTAssertEqual(stops.count, 3)
        XCTAssertEqual(hexString(from: stops[0]), "#22d3ee")
        XCTAssertEqual(hexString(from: stops[1]), "#06b6d4")
        XCTAssertEqual(hexString(from: stops[2]), "#0891b2")
    }

    // MARK: - Neon Gradient

    func testNeonGradientStops() {
        let stops = GradientToken.neonStops
        XCTAssertEqual(stops.count, 3)
        XCTAssertEqual(hexString(from: stops[0]), "#8b5cf6")
        XCTAssertEqual(hexString(from: stops[1]), "#d946ef")
        XCTAssertEqual(hexString(from: stops[2]), "#22d3ee")
    }

    // MARK: - Tech Gradient

    func testTechGradientStops() {
        let stops = GradientToken.techStops
        XCTAssertEqual(stops.count, 3)
        XCTAssertEqual(hexString(from: stops[0]), "#6d28d9")
        XCTAssertEqual(hexString(from: stops[1]), "#a21caf")
        XCTAssertEqual(hexString(from: stops[2]), "#0891b2")
    }

    // MARK: - Background Gradient

    func testBackgroundGradientStops() {
        let stops = GradientToken.backgroundStops
        XCTAssertEqual(stops.count, 3)
        XCTAssertEqual(hexString(from: stops[0]), "#f5f3ff")
        XCTAssertEqual(hexString(from: stops[1]), "#fdf4ff")
        XCTAssertEqual(hexString(from: stops[2]), "#ecfeff")
    }
}
