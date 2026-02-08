import XCTest
import SwiftUI
@testable import AvaRobotics

final class TypographyTokenTests: XCTestCase {

    // MARK: - Display

    func testDisplay1() {
        let token = TypographyToken.display1
        XCTAssertEqual(token.size, 36)
        XCTAssertEqual(token.weight, .bold)
        XCTAssertEqual(token.lineSpacing, 4)
        XCTAssertEqual(token.tracking, -0.5)
        XCTAssertEqual(token.relativeTo, .largeTitle)
    }

    func testDisplay2() {
        let token = TypographyToken.display2
        XCTAssertEqual(token.size, 30)
        XCTAssertEqual(token.weight, .bold)
        XCTAssertEqual(token.lineSpacing, 4)
        XCTAssertEqual(token.tracking, -0.5)
        XCTAssertEqual(token.relativeTo, .title)
    }

    // MARK: - Headings

    func testHeading1() {
        let token = TypographyToken.heading1
        XCTAssertEqual(token.size, 24)
        XCTAssertEqual(token.weight, .semibold)
        XCTAssertEqual(token.lineSpacing, 2)
        XCTAssertEqual(token.tracking, 0)
        XCTAssertEqual(token.relativeTo, .title2)
    }

    func testHeading2() {
        let token = TypographyToken.heading2
        XCTAssertEqual(token.size, 20)
        XCTAssertEqual(token.weight, .semibold)
        XCTAssertEqual(token.lineSpacing, 2)
        XCTAssertEqual(token.tracking, 0)
        XCTAssertEqual(token.relativeTo, .title3)
    }

    func testHeading3() {
        let token = TypographyToken.heading3
        XCTAssertEqual(token.size, 18)
        XCTAssertEqual(token.weight, .semibold)
        XCTAssertEqual(token.lineSpacing, 2)
        XCTAssertEqual(token.tracking, 0)
        XCTAssertEqual(token.relativeTo, .headline)
    }

    // MARK: - Body

    func testBodyLarge() {
        let token = TypographyToken.bodyLarge
        XCTAssertEqual(token.size, 18)
        XCTAssertEqual(token.weight, .regular)
        XCTAssertEqual(token.lineSpacing, 4)
        XCTAssertEqual(token.tracking, 0)
        XCTAssertEqual(token.relativeTo, .body)
    }

    func testBodyRegular() {
        let token = TypographyToken.bodyRegular
        XCTAssertEqual(token.size, 16)
        XCTAssertEqual(token.weight, .regular)
        XCTAssertEqual(token.lineSpacing, 4)
        XCTAssertEqual(token.tracking, 0)
        XCTAssertEqual(token.relativeTo, .body)
    }

    func testBodyMedium() {
        let token = TypographyToken.bodyMedium
        XCTAssertEqual(token.size, 16)
        XCTAssertEqual(token.weight, .medium)
        XCTAssertEqual(token.lineSpacing, 4)
        XCTAssertEqual(token.tracking, 0)
        XCTAssertEqual(token.relativeTo, .body)
    }

    func testBodySemibold() {
        let token = TypographyToken.bodySemibold
        XCTAssertEqual(token.size, 16)
        XCTAssertEqual(token.weight, .semibold)
        XCTAssertEqual(token.lineSpacing, 4)
        XCTAssertEqual(token.tracking, 0)
        XCTAssertEqual(token.relativeTo, .body)
    }

    func testBodySmall() {
        let token = TypographyToken.bodySmall
        XCTAssertEqual(token.size, 14)
        XCTAssertEqual(token.weight, .regular)
        XCTAssertEqual(token.lineSpacing, 3)
        XCTAssertEqual(token.tracking, 0)
        XCTAssertEqual(token.relativeTo, .callout)
    }

    func testBodySmallMedium() {
        let token = TypographyToken.bodySmallMedium
        XCTAssertEqual(token.size, 14)
        XCTAssertEqual(token.weight, .medium)
        XCTAssertEqual(token.lineSpacing, 3)
        XCTAssertEqual(token.tracking, 0)
        XCTAssertEqual(token.relativeTo, .callout)
    }

    // MARK: - Caption

    func testCaption() {
        let token = TypographyToken.caption
        XCTAssertEqual(token.size, 12)
        XCTAssertEqual(token.weight, .regular)
        XCTAssertEqual(token.lineSpacing, 2)
        XCTAssertEqual(token.tracking, 0)
        XCTAssertEqual(token.relativeTo, .caption)
    }

    func testCaptionMedium() {
        let token = TypographyToken.captionMedium
        XCTAssertEqual(token.size, 12)
        XCTAssertEqual(token.weight, .medium)
        XCTAssertEqual(token.lineSpacing, 2)
        XCTAssertEqual(token.tracking, 0)
        XCTAssertEqual(token.relativeTo, .caption)
    }

    // MARK: - Button

    func testButtonLarge() {
        let token = TypographyToken.buttonLarge
        XCTAssertEqual(token.size, 18)
        XCTAssertEqual(token.weight, .semibold)
        XCTAssertEqual(token.lineSpacing, 0)
        XCTAssertEqual(token.tracking, 0.5)
        XCTAssertEqual(token.relativeTo, .headline)
    }

    func testButtonMedium() {
        let token = TypographyToken.buttonMedium
        XCTAssertEqual(token.size, 16)
        XCTAssertEqual(token.weight, .medium)
        XCTAssertEqual(token.lineSpacing, 0)
        XCTAssertEqual(token.tracking, 0.5)
        XCTAssertEqual(token.relativeTo, .body)
    }

    func testButtonSmall() {
        let token = TypographyToken.buttonSmall
        XCTAssertEqual(token.size, 14)
        XCTAssertEqual(token.weight, .medium)
        XCTAssertEqual(token.lineSpacing, 0)
        XCTAssertEqual(token.tracking, 0.5)
        XCTAssertEqual(token.relativeTo, .callout)
    }

    // MARK: - Label & Input

    func testLabel() {
        let token = TypographyToken.label
        XCTAssertEqual(token.size, 14)
        XCTAssertEqual(token.weight, .medium)
        XCTAssertEqual(token.lineSpacing, 0)
        XCTAssertEqual(token.tracking, 0.5)
        XCTAssertEqual(token.relativeTo, .callout)
    }

    func testInput() {
        let token = TypographyToken.input
        XCTAssertEqual(token.size, 16)
        XCTAssertEqual(token.weight, .regular)
        XCTAssertEqual(token.lineSpacing, 0)
        XCTAssertEqual(token.tracking, 0)
        XCTAssertEqual(token.relativeTo, .body)
    }

    // MARK: - Size Ordering

    func testSizesDescendingWithinCategories() {
        XCTAssertGreaterThan(TypographyToken.display1.size, TypographyToken.display2.size)
        XCTAssertGreaterThan(TypographyToken.heading1.size, TypographyToken.heading2.size)
        XCTAssertGreaterThanOrEqual(TypographyToken.heading2.size, TypographyToken.heading3.size)
        XCTAssertGreaterThan(TypographyToken.bodyLarge.size, TypographyToken.bodyRegular.size)
        XCTAssertGreaterThan(TypographyToken.bodyRegular.size, TypographyToken.bodySmall.size)
        XCTAssertGreaterThan(TypographyToken.bodySmall.size, TypographyToken.caption.size)
    }

    // MARK: - All Cases Count

    func testAllPresetsExist() {
        XCTAssertEqual(TypographyToken.allCases.count, 18)
    }
}
