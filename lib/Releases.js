"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubReleases = void 0;
const core = __importStar(require("@actions/core"));
class GithubReleases {
    constructor(inputs, git) {
        this.inputs = inputs;
        this.git = git;
    }
    create(tag, body, commitHash, discussionCategory, draft, generateReleaseNotes, makeLatest, name, prerelease) {
        return __awaiter(this, void 0, void 0, function* () {
            core.info(`[createRelease] tag: ${tag}, commitHash: ${commitHash}, draft: ${draft}, prerelease: ${prerelease}, name: ${name}`);
            // noinspection TypeScriptValidateJSTypes
            return this.git.rest.repos.createRelease({
                body: body,
                name: name,
                discussion_category_name: discussionCategory,
                draft: draft,
                generate_release_notes: generateReleaseNotes,
                make_latest: makeLatest,
                owner: this.inputs.owner,
                prerelease: prerelease,
                repo: this.inputs.repo,
                target_commitish: commitHash,
                tag_name: tag
            });
        });
    }
    deleteArtifact(assetId) {
        return __awaiter(this, void 0, void 0, function* () {
            core.info(`[deleteArtifact] assetId: ${assetId}`);
            return this.git.rest.repos.deleteReleaseAsset({
                asset_id: assetId,
                owner: this.inputs.owner,
                repo: this.inputs.repo
            });
        });
    }
    getByTag(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            core.info(`[getByTag] tag: ${tag}`);
            return this.git.rest.repos.getReleaseByTag({
                owner: this.inputs.owner,
                repo: this.inputs.repo,
                tag: tag
            });
        });
    }
    listArtifactsForRelease(releaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            core.info(`[listArtifactsForRelease] id: ${releaseId}`);
            return this.git.paginate(this.git.rest.repos.listReleaseAssets, {
                owner: this.inputs.owner,
                release_id: releaseId,
                repo: this.inputs.repo
            });
        });
    }
    listReleases() {
        return __awaiter(this, void 0, void 0, function* () {
            core.info(`[listReleases]`);
            return this.git.rest.repos.listReleases({
                owner: this.inputs.owner,
                repo: this.inputs.repo
            });
        });
    }
    update(id, tag, body, commitHash, discussionCategory, draft, makeLatest, name, prerelease) {
        return __awaiter(this, void 0, void 0, function* () {
            // noinspection TypeScriptValidateJSTypes
            core.info(`[update] id: ${id}, tag: ${tag}, commitHash: ${commitHash}, draft: ${draft}, prerelease: ${prerelease}, name: ${name}`);
            return this.git.rest.repos.updateRelease({
                release_id: id,
                body: body,
                name: name,
                discussion_category_name: discussionCategory,
                draft: draft,
                make_latest: makeLatest,
                owner: this.inputs.owner,
                prerelease: prerelease,
                repo: this.inputs.repo,
                target_commitish: commitHash,
                tag_name: tag
            });
        });
    }
    uploadArtifact(assetUrl, contentLength, contentType, file, name, releaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            core.info(`[uploadArtifact] id: ${releaseId}`);
            return this.git.rest.repos.uploadReleaseAsset({
                url: assetUrl,
                headers: {
                    "content-length": contentLength,
                    "content-type": contentType
                },
                data: file,
                name: name,
                owner: this.inputs.owner,
                release_id: releaseId,
                repo: this.inputs.repo
            });
        });
    }
}
exports.GithubReleases = GithubReleases;
