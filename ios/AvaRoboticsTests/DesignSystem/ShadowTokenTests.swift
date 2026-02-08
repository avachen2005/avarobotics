import XCTest
import SwiftUI
@testable import AvaRobotics

final class ShadowTokenTests: XCTestCase {

    // MARK: - Standard Shadows

    func testSmShadow() {
        let token = ShadowToken.sm
        XCTAssertEqual(token.radius, 2)
        XCTAssertEqual(token.x, 0)
        XCTAssertEqual(token.y, 1)
    }

    func testMdShadow() {
        let token = ShadowToken.md
        XCTAssertEqual(token.radius, 6)
        XCTAssertEqual(token.x, 0)
        XCTAssertEqual(token.y, 4)
    }

    func testLgShadow() {
        let token = ShadowToken.lg
        XCTAssertEqual(token.radius, 15)
        XCTAssertEqual(token.x, 0)
        XCTAssertEqual(token.y, 10)
    }

    func testXlShadow() {
        let token = ShadowToken.xl
        XCTAssertEqual(token.radius, 25)
        XCTAssertEqual(token.x, 0)
        XCTAssertEqual(token.y, 20)
    }

    func testXxlShadow() {
        let token = ShadowToken.xxl
        XCTAssertEqual(token.radius, 50)
        XCTAssertEqual(token.x, 0)
        XCTAssertEqual(token.y, 25)
    }

    // MARK: - Glow Effects

    func testGlowPurple() {
        let token = ShadowToken.glowPurple
        XCTAssertEqual(token.radius, 30)
        XCTAssertEqual(token.x, 0)
        XCTAssertEqual(token.y, 0)
    }

    func testGlowPink() {
        let token = ShadowToken.glowPink
        XCTAssertEqual(token.radius, 30)
        XCTAssertEqual(token.x, 0)
        XCTAssertEqual(token.y, 0)
    }

    func testGlowCyan() {
        let token = ShadowToken.glowCyan
        XCTAssertEqual(token.radius, 30)
        XCTAssertEqual(token.x, 0)
        XCTAssertEqual(token.y, 0)
    }

    // MARK: - Monotonically Increasing

    func testShadowRadiusMonotonicallyIncreasing() {
        let standardShadows: [ShadowToken] = [.sm, .md, .lg, .xl, .xxl]
        for i in 0..<(standardShadows.count - 1) {
            XCTAssertLessThan(standardShadows[i].radius, standardShadows[i + 1].radius)
        }
    }

    // MARK: - All Cases Count

    func testAllCasesCount() {
        XCTAssertEqual(ShadowToken.allCases.count, 8)
    }
}
