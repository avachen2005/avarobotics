import XCTest
import SwiftUI
@testable import AvaRobotics

final class ColorTokenTests: XCTestCase {

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

    // MARK: - Primary

    func testPrimaryColors() {
        XCTAssertEqual(hexString(from: ColorToken.Primary.p50), "#f5f3ff")
        XCTAssertEqual(hexString(from: ColorToken.Primary.p100), "#ede9fe")
        XCTAssertEqual(hexString(from: ColorToken.Primary.p200), "#ddd6fe")
        XCTAssertEqual(hexString(from: ColorToken.Primary.p300), "#c4b5fd")
        XCTAssertEqual(hexString(from: ColorToken.Primary.p400), "#a78bfa")
        XCTAssertEqual(hexString(from: ColorToken.Primary.p500), "#8b5cf6")
        XCTAssertEqual(hexString(from: ColorToken.Primary.p600), "#7c3aed")
        XCTAssertEqual(hexString(from: ColorToken.Primary.p700), "#6d28d9")
        XCTAssertEqual(hexString(from: ColorToken.Primary.p800), "#5b21b6")
        XCTAssertEqual(hexString(from: ColorToken.Primary.p900), "#4c1d95")
    }

    // MARK: - Accent

    func testAccentColors() {
        XCTAssertEqual(hexString(from: ColorToken.Accent.a50), "#fdf4ff")
        XCTAssertEqual(hexString(from: ColorToken.Accent.a100), "#fae8ff")
        XCTAssertEqual(hexString(from: ColorToken.Accent.a200), "#f5d0fe")
        XCTAssertEqual(hexString(from: ColorToken.Accent.a300), "#f0abfc")
        XCTAssertEqual(hexString(from: ColorToken.Accent.a400), "#e879f9")
        XCTAssertEqual(hexString(from: ColorToken.Accent.a500), "#d946ef")
        XCTAssertEqual(hexString(from: ColorToken.Accent.a600), "#c026d3")
        XCTAssertEqual(hexString(from: ColorToken.Accent.a700), "#a21caf")
    }

    // MARK: - Secondary

    func testSecondaryColors() {
        XCTAssertEqual(hexString(from: ColorToken.Secondary.s50), "#ecfeff")
        XCTAssertEqual(hexString(from: ColorToken.Secondary.s100), "#cffafe")
        XCTAssertEqual(hexString(from: ColorToken.Secondary.s200), "#a5f3fc")
        XCTAssertEqual(hexString(from: ColorToken.Secondary.s300), "#67e8f9")
        XCTAssertEqual(hexString(from: ColorToken.Secondary.s400), "#22d3ee")
        XCTAssertEqual(hexString(from: ColorToken.Secondary.s500), "#06b6d4")
        XCTAssertEqual(hexString(from: ColorToken.Secondary.s600), "#0891b2")
    }

    // MARK: - Neutral

    func testNeutralColors() {
        XCTAssertEqual(hexString(from: ColorToken.Neutral.n50), "#f8fafc")
        XCTAssertEqual(hexString(from: ColorToken.Neutral.n100), "#f1f5f9")
        XCTAssertEqual(hexString(from: ColorToken.Neutral.n200), "#e2e8f0")
        XCTAssertEqual(hexString(from: ColorToken.Neutral.n300), "#cbd5e1")
        XCTAssertEqual(hexString(from: ColorToken.Neutral.n400), "#94a3b8")
        XCTAssertEqual(hexString(from: ColorToken.Neutral.n500), "#64748b")
        XCTAssertEqual(hexString(from: ColorToken.Neutral.n600), "#475569")
        XCTAssertEqual(hexString(from: ColorToken.Neutral.n700), "#334155")
        XCTAssertEqual(hexString(from: ColorToken.Neutral.n800), "#1e293b")
        XCTAssertEqual(hexString(from: ColorToken.Neutral.n900), "#0f172a")
    }

    // MARK: - Semantic

    func testSemanticColors() {
        XCTAssertEqual(hexString(from: ColorToken.Semantic.white), "#ffffff")
        XCTAssertEqual(hexString(from: ColorToken.Semantic.black), "#000000")
    }

    // MARK: - Status

    func testStatusColors() {
        XCTAssertEqual(hexString(from: ColorToken.Status.success), "#22c55e")
        XCTAssertEqual(hexString(from: ColorToken.Status.warning), "#f59e0b")
        XCTAssertEqual(hexString(from: ColorToken.Status.error), "#ef4444")
        XCTAssertEqual(hexString(from: ColorToken.Status.info), "#3b82f6")
    }
}
