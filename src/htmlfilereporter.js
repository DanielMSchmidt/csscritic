window.csscritic = (function (module) {

    var reportComparison = function (result, basePath, callback) {
        var targetImageFileName = getTargetName(result.pageUrl),
            targetImagePath = basePath + targetImageFileName,
            image = result.pageImage;

        renderUrlToFile(image.src, targetImagePath, image.width, image.height, function () {
            if (callback) {
                callback();
            }
        });
    };

    var getTargetName = function (filePath) {
        var fileName = filePath.substr(filePath.lastIndexOf("/")+1),
            stripEnding = ".html";

        if (fileName.substr(fileName.length - stripEnding.length) === stripEnding) {
            fileName = fileName.substr(0, fileName.length - stripEnding.length);
        }
        return fileName + ".png";
    };

    var renderUrlToFile = function (url, filePath, width, height, callback) {
        var page = require("webpage").create();

        page.viewportSize = {
            width: width,
            height: height
        };

        page.open(url, function () {
            page.render(filePath);

            callback();
        });
    };

    module.HtmlFileReporter = function (basePath) {
        basePath = basePath || "./";

        return {
            reportComparison: function (result, callback) {
                return reportComparison(result, basePath, callback);
            }
        };
    };

    return module;
}(window.csscritic || {}));
